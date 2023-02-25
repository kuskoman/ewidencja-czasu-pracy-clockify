import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  FileSystemFileEntry,
  NgxFileDropEntry,
  NgxFileDropModule,
} from 'ngx-file-drop';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss'],
})
export class ReportFormComponent implements OnInit {
  public form!: FormGroup;
  public file: NgxFileDropEntry | null = null;

  private readonly localStorageFormKey = 'savedFormData';

  constructor(private readonly http: HttpClient) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      periodStart: new FormControl(''),
      periodEnd: new FormControl(''),
    });

    this.loadFormData();
  }

  public dropped(files: NgxFileDropEntry[]) {
    const realFiles = files.filter((file) => file.relativePath);
    if (realFiles.length != 1) {
      throw new Error('You can only drop a single file');
    }

    const [file] = realFiles;
    this.file = file;
  }

  public handleFormInput() {
    const name = this.form.get('name')?.value;
    const surname = this.form.get('surname')?.value;

    const savedFormData = {
      name,
      surname,
    };

    const savedFormDataJson = JSON.stringify(savedFormData);
    localStorage.setItem(this.localStorageFormKey, savedFormDataJson);
  }

  public async sendFormData() {
    console.log('Submitting');
    const formData = await this.getFormData();
    console.log('formData', formData);
    this.http
      .post('http://localhost:3000/api/reports', formData, {
        responseType: 'blob',
      })
      .subscribe((data) => {
        const blob = new Blob([data], { type: 'text/html; charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      });
  }

  private loadFormData() {
    const savedFormDataJson = localStorage.getItem(this.localStorageFormKey);
    if (!savedFormDataJson) {
      return;
    }

    const savedFormData = JSON.parse(savedFormDataJson);
    this.form.patchValue(savedFormData);
  }

  private getFormData() {
    const formData = new FormData();

    Object.entries(this.form.controls)
      .filter(([, v]) => v.value)
      .forEach(([key, control]) => {
        formData.append(key, control.value);
      });

    if (!this.file) {
      throw new Error('You must define file to submit the form');
    }

    if (this.file.fileEntry.isDirectory) {
      throw new Error('You cannot upload a directory');
    }

    return new Promise<FormData>((res) => {
      const fileEntry = this.file!.fileEntry as FileSystemFileEntry;
      fileEntry.file((loadedFile) => {
        formData.append('file', loadedFile, loadedFile.name);
      });

      res(formData);
    });
  }
}
