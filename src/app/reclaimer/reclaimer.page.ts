import { Component, OnInit } from '@angular/core';
import { ModalpopupPage } from './../modalpopup/modalpopup.page';

import * as firebase from 'firebase';
import {ModalController} from '@ionic/angular';


@Component({
  selector: 'app-reclaimer',
  templateUrl: './reclaimer.page.html',
  styleUrls: ['./reclaimer.page.scss'],
})
export class ReclaimerPage implements OnInit {

  constructor(private modalcontroller:ModalController) 
  { 

  }

  ngOnInit() {
  }
  openModal(){
    this.modalcontroller.create({component:ModalpopupPage}).then((modalElement)=>{
  modalElement.present();
    })
  }
}
