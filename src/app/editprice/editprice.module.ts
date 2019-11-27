import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditpricePageRoutingModule } from './editprice-routing.module';

import { EditpricePage } from './editprice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditpricePageRoutingModule
  ],
  declarations: [EditpricePage]
})
export class EditpricePageModule {}
