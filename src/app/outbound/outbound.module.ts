import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutboundPageRoutingModule } from './outbound-routing.module';

import { OutboundPage } from './outbound.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    OutboundPageRoutingModule
  ],
  declarations: [OutboundPage]
})
export class OutboundPageModule {}
