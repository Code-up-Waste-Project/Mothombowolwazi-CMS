import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { ModalController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  db = firebase.firestore();

  id;
  Outbound;
  ViewOutbound = [];

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
      this.getOutBound(this.id);
      // console.log(this.getOutBound);
  }

  ngOnInit() {
  }

  getOutBound(id) {
    this.Outbound = this.db.collection('outbound').doc(id);
    this.Outbound.get().then((documentSnapshot) => {
      this.ViewOutbound = [];
      console.log(documentSnapshot.data());
      this.ViewOutbound.push(documentSnapshot.data());
      console.log(this.viewreports);
    });
  }

  CloseModal() {
  this.modalcontroller.dismiss();
  }

}
