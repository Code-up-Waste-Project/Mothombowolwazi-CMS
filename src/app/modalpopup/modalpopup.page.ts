import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.page.html',
  styleUrls: ['./modalpopup.page.scss'],
})
export class ModalpopupPage implements OnInit {
  db =firebase.firestore();
  reclaimer={

    name:null,
    address:null,
    surname:null,
    contact:null,
    // userid:firebase.auth().currentUser.uid,

  
  }
  constructor(public toastController: ToastController,private modalcontroller:ModalController,private router:Router)
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
      this.db.collection('reclaimers').doc(firebase.auth().currentUser.uid).set({
        name: this.reclaimer.name,
        surname: this.reclaimer.surname,
        address: this.reclaimer.address,
        contact:this.reclaimer.contact,
        // userid: this.reclaimer.userid
        
      })
      .then(function() {
        console.log("Document successfully written!");
       
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
      this.router.navigateByUrl('/home');
    }
    }
    
    
}
