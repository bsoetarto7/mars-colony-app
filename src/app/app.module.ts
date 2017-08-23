import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RegisterComponent } from './components/register/register.component';
import { ReportComponent } from './components/report/report.component';
import { EncountersComponent } from './components/encounters/encounters.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

import { AppRoutes } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    RegisterComponent,
    ReportComponent,
    EncountersComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RouterModule.forRoot(AppRoutes),
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
