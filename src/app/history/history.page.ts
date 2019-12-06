import { Component, OnInit } from '@angular/core';

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

}
