import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportFormComponent } from './report-form/report-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AppInitService } from './app-init.service';

export const initApp = (appInitService: AppInitService) => {
  return () => appInitService.init();
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReportFormComponent,
    NavbarComponent,
    FooterComponent,
  ],
  providers: [
    AppInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [AppInitService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
