import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistoryComponent } from './history/history.component';
import { TakepictureComponent } from './takepicture/takepicture.component';

import { firebaseConfig } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './login/auth.guard';
import { HistoryGuard } from './history/history.guard';
import {WebcamModule} from 'ngx-webcam';

import { LoginService } from './login/login.service';
import { DashboardService } from './dashboard/dashboard.service';
import { HistoryService } from './history/history.service';
import { TakepictureService } from './takepicture/takepicture.service';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HistoryComponent,
    TakepictureComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    WebcamModule
  ],
  providers: [LoginService, DashboardService, HistoryService, TakepictureService, AuthGuard, HistoryGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
