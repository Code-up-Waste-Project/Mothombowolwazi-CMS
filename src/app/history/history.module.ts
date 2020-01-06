import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryPageRoutingModule } from './history-routing.module';

import { HistoryPage } from './history.page';

// import { BrowserModule } from '@angular/platform-browser';
// import { AppComponent } from './../app.component';
// import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // BrowserModule,
    // PdfViewerModule,
    IonicModule,
    HistoryPageRoutingModule
  ],
  declarations: [HistoryPage],
  bootstrap: [HistoryPage]
})
export class HistoryPageModule {}
