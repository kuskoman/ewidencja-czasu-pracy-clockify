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
  ],
  standalone: true,
})
export class ReportFormComponent implements OnInit {
  public form!: FormGroup;
  private file: NgxFileDropEntry | null = null;

  constructor(private readonly http: HttpClient) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      periodStart: new FormControl(''),
      periodEnd: new FormControl(''),
    });
  }

  public dropped(files: NgxFileDropEntry[]) {
    if (files.length != 1) {
      throw new Error('You can only drop a single file');
    }

    const [file] = files;
    this.form;
  }

  public async submit() {
    console.log('Submitting');
    const formData = await this.getFormData();
    this.http
      .post('http://localhost:3000/reports', formData)
      .subscribe((data) => {
        console.log(data);
      });
  }

  private getFormData() {
    const formData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (!this.file) {
      throw new Error('You must define file to submit the form');
    }

    if (this.file.fileEntry.isDirectory) {
      throw new Error('You cannot upload a directory');
    }

    return new Promise((res, rej) => {
      const fileEntry = this.file!.fileEntry as FileSystemFileEntry;
      fileEntry.file((loadedFile) => {
        formData.append('file', loadedFile, this.file!.relativePath);
      });
    });
  }
}
