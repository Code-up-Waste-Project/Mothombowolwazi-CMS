import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReclaimerPageRoutingModule } from './reclaimer-routing.module';

import { ReclaimerPage } from './reclaimer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ReclaimerPageRoutingModule
  ],
  declarations: [ReclaimerPage]
})
export class ReclaimerPageModule {}
