import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportFormComponent } from './report-form/report-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from './material/material.module';
import { AppConfigurationService } from './app-config.service';

@NgModule({
  declarations: [AppComponent, ReportFormComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NavbarComponent,
    FooterComponent,
    MaterialModule,
  ],
  providers: [AppConfigurationService],
  bootstrap: [AppComponent, ReportFormComponent],
})
export class AppModule {}
