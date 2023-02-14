import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {
  FileSystemFileEntry,
  NgxFileDropEntry,
  NgxFileDropModule,
} from 'ngx-file-drop';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss'],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    NgxFileDropModule,
    MatIconModule,
    HttpClientModule,
    CommonModule,
  ],
  standalone: true,
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
      .post('http://localhost:3000/api/reports', formData)
      .subscribe((data) => {
        console.log('Response:');
        console.log(data);
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
        formData.append('file', loadedFile);
      });

      res(formData);
    });
  }
}
