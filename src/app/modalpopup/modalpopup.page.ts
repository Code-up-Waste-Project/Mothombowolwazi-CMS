import { Router, ActivatedRoute  } from '@angular/router';
import { ModalController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.page.html',
  styleUrls: ['./modalpopup.page.scss'],
})
export class ModalpopupPage implements OnInit {

  db = firebase.firestore();

  id;
  Reclaimer;
  ViewReclaimer = [];

  constructor(
    public toastController: ToastController,
    private modalcontroller: ModalController,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public activatedRoute: ActivatedRoute,
    public menuCtrl: MenuController
    ) {
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      console.log(this.id);
      this.getReclaimer(this.id);
      // console.log(this.getReclaimer);
    }

    ngOnInit() {
    }

    getReclaimer(id) {
      this.Reclaimer = this.db.collection('reclaimers').doc(id);
      this.Reclaimer.get().then((documentSnapshot) => {
        this.ViewReclaimer = [];
        console.log(documentSnapshot.data());
        this.ViewReclaimer.push(documentSnapshot.data());
        console.log(this.ViewReclaimer);
      });
    }

}
