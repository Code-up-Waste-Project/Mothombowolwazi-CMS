import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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
