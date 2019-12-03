import { Router } from '@angular/router';
import { ModalController, ToastController,LoadingController,AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
 

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.page.html',
  styleUrls: ['./modalpopup.page.scss'],
})
export class ModalpopupPage implements OnInit {
  db =firebase.firestore();
  reclaimer={
// reclaimerid:null,
    name:null,
    address:null,
    surname:null,
    contact:null,
    //  reclaimerid:firebase.auth().currentUser.uid,

  
  }
  constructor(public toastController: ToastController,private modalcontroller:ModalController,private router:Router, public loadingController: LoadingController,public alertController: AlertController)
   { 

  }

  ngOnInit() {
  }
  CloseModal(){

    this.modalcontroller.dismiss();
    
    }
    async Addreclaimer(){

      if(this.reclaimer.name ==""||this.reclaimer.name==undefined)
      {
        const toast = await this.toastController.create({
          message: 'Enter the name.',
          duration: 2000
        });
        toast.present();
      }
      else 
      if(parseFloat(this.reclaimer.contact).toString().length !=10||this.reclaimer.contact==undefined)
      {
        const toast = await this.toastController.create({
          message: 'Enter the contact numbers.',
          duration: 2000
        });
        toast.present();
      }
      else
      if(this.reclaimer.address ==""||this.reclaimer.address==undefined)
      {
        const toast = await this.toastController.create({
          message: 'Enter the address',
          duration: 2000
        });
        toast.present();
      }
      else
      if(this.reclaimer.surname ==""||this.reclaimer.surname==undefined)
      {
        const toast = await this.toastController.create({
          message: 'Enter the surname.',
          duration: 2000
        });
        toast.present();
      }
      else
      {
      this.db.collection('reclaimers').doc().set({
        name: this.reclaimer.name,
        surname: this.reclaimer.surname,
        address: this.reclaimer.address,
        contact:this.reclaimer.contact,
        // reclaimerid:this.reclaimer.reclaimerid
        // userid: this.reclaimer.userid,
      })

      const alert = await this.alertController.create({
        header: 'Alert',
        subHeader: 'Subtitle',
        message: 'successfully added.',
        buttons: ['OK'],
      });
    
      await alert.present();
      let result = await alert.onDidDismiss();
      console.log(result);


      this.router.navigateByUrl('/home');

    //   .then(function() {
    //     console.log("Document successfully written!");
       
    //   })
    //   .catch(function(error) {
    //     console.error("Error writing document: ", error);
    //   });
     
    }
    // this.router.navigateByUrl('/home');
    }
    
    
}
