import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

import * as firebase from 'firebase';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
db=firebase.firestore()
newreclaimer=[]
  constructor() 
  
  
  { 
 
    this.db.collection('reclaimers').onSnapshot(snapshot => {
       
      //  this.profile.name = snapshot.docs.name
        // this.profile.email = snapshot.data().email;
        // email: firebase.auth().currentUser.email,
        // this.profile.name = snapshot.data().name;
        // this.profile.surname = snapshot.data().surname;
        // this.profile.position = snapshot.data().position;
        // // this.profile.image = snapshot.data().image;
        // console.log('users', this.userprofile);
        snapshot.forEach(item => {
       
          this.newreclaimer.push(item.data());
          console.log("my reclaimers",this.newreclaimer);
          
        })
      });





  db = firebase.firestore();

  date;
  DriverName;
  RegistarionNumberPlates;
  TruckSourcess;
  Destination;
  GH001storagemass;
  NFAL01storagemass;
  PAP005storagemass;
  PAP007storagemass;
  PAP001storagemass;
  PAP003storagemass;
  HD001storagemass;
  LD001storagemass;
  LD003storagemass;
  PET001storagemass;
  PET003storagemass;
  PET005storagemass;
  ovarallMass;

  constructor
  (public route: Router), {
    // this.getMasses();
 }

  ngOnInit() {
  }
  delete(x){

    console.log(x)
    // this.newuserprofile = [];
    let email =x.email;


    // this.Booking = [];
    this.db.collection("reclaimers").doc(x.userUid).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  }

  getoutbound() {
    this.db.collection('outbound').onSnapshot(snapshot => {
      snapshot.forEach(element => {
        this.GH001storagemass = element.data().GL001;
        this.NFAL01storagemass = element.data().NFAL01;
        this.PAP005storagemass = element.data().PAP005;
        this.PAP007storagemass = element.data().PAP007;
        this.PAP001storagemass = element.data().PAP001;
        this.PAP003storagemass = element.data().PAP003;
        this.HD001storagemass = element.data().HD001;
        this.LD001storagemass = element.data().LD001;
        this.LD003storagemass = element.data().LD003;
        this.PET001storagemass = element.data().PET001;
        this.PET003storagemass = element.data().PET003;
        this.PET005storagemass = element.data().PEP005;
        // console.log(element);
      });
      // console.log(this.GH001storagemass);
      // console.log(this.NFAL01storagemass);
      // console.log(this.PAP005storagemass);
      // console.log(this.PAP007storagemass);
      // console.log(this.PAP001storagemass);
      // console.log(this.PAP003storagemass);
      // console.log(this.HD001storagemass);
      // console.log(this.LD001storagemass);
      // console.log(this.LD003storagemass);
      // console.log(this.PET001storagemass);
      // console.log(this.PET003storagemass);
      // console.log(this.PET005storagemass);
    });
  }

  getreclaimer() {
    this.db.collection('outbound').onSnapshot(snapshot => {
      snapshot.forEach(element => {
        this.GH001storagemass = element.data().GL001;
        this.NFAL01storagemass = element.data().NFAL01;
        this.PAP005storagemass = element.data().PAP005;
        this.PAP007storagemass = element.data().PAP007;
        this.PAP001storagemass = element.data().PAP001;
        this.PAP003storagemass = element.data().PAP003;
        this.HD001storagemass = element.data().HD001;
        this.LD001storagemass = element.data().LD001;
        this.LD003storagemass = element.data().LD003;
        this.PET001storagemass = element.data().PET001;
        this.PET003storagemass = element.data().PET003;
        this.PET005storagemass = element.data().PEP005;
        // console.log(element);
      });
      // console.log(this.GH001storagemass);
      // console.log(this.NFAL01storagemass);
      // console.log(this.PAP005storagemass);
      // console.log(this.PAP007storagemass);
      // console.log(this.PAP001storagemass);
      // console.log(this.PAP003storagemass);
      // console.log(this.HD001storagemass);
      // console.log(this.LD001storagemass);
      // console.log(this.LD003storagemass);
      // console.log(this.PET001storagemass);
      // console.log(this.PET003storagemass);
      // console.log(this.PET005storagemass);
    });
  }
}
