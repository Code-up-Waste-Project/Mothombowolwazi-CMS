import {ModalpopupPageModule} from './../modalpopup/modalpopup.module';
import { ModalpopupPage } from './../modalpopup/modalpopup.page';
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
  db =firebase.firestore();
    profiles
    profile={
  image:null,
  name:null,
  addres:null,
  surname:null, 
  position:null,
  isAdmin:true,
  // userid:firebase.auth().currentUser.uid,
  // email:firebase.auth().currentUser.email
    
    }
  isAdmin: any;



  constructor(private modalcontroller:ModalController) {}
  openModal(){
    this.modalcontroller.create({component:ModalpopupPage}).then((modalElement)=>{
  modalElement.present();
    })
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .doc(`/userprofile/${user.uid}`)
          .get()
          .then(userProfileSnapshot => {
          this.isAdmin = userProfileSnapshot.data().isAdmin;
          });
      }
    });
  }
 
  
}
