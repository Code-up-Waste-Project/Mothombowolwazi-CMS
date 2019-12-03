import {ModalpopupPageModule} from './../modalpopup/modalpopup.module';
import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private modalcontroller: ModalController,
    public route: Router,
    public alertController: AlertController,
    ) {}

}
