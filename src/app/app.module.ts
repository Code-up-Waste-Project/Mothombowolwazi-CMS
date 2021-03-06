import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import * as firebase from 'firebase';
import {ModalpopupPageModule} from './modalpopup/modalpopup.module';

import { PdfViewerModule } from 'ng2-pdf-viewer';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB5FpPISbzSmTxUH4IY5qk9cXtLnK2djy0",
  authDomain: "mthombowolwazi-a7902.firebaseapp.com",
  databaseURL: "https://mthombowolwazi-a7902.firebaseio.com",
  projectId: "mthombowolwazi-a7902",
  storageBucket: "gs://mthombowolwazi-a7902.appspot.com",
  messagingSenderId: "600992256023",
  appId: "1:600992256023:web:816994d446312af5020c52",
  measurementId: "G-BM6WENYL3H"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    
    AppRoutingModule,
    PdfViewerModule,
    ModalpopupPageModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    File,
    FileOpener
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

// platformBrowserDynamic().bootstrapModule(AppModule);
