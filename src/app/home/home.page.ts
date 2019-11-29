import { Component } from '@angular/core';
import { ModalpopupPage } from './../modalpopup/modalpopup.page';

import * as firebase from 'firebase';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private modalcontroller:ModalController) {}
  openModal(){
    this.modalcontroller.create({component:ModalpopupPage}).then((modalElement)=>{
  modalElement.present();
    })
  }
}
