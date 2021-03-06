import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './_compenents/alert/alert.component';
import { ErrorInterceptor, fakeBackendProvider, JwtInterceptor } from './_helpers';
import { HomeComponent } from './home/home.component';
import { NewObservableComponent } from './demo/new-observable/new-observable.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    NewObservableComponent// ,
    // AdDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
