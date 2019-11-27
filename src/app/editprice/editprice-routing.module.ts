import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditpricePage } from './editprice.page';

const routes: Routes = [
  {
    path: '',
    component: EditpricePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditpricePageRoutingModule {}
