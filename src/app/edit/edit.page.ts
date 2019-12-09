import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  db = firebase.firestore();

  // user infor
  admin = [];
  Newadmin = [];

  constructor(public route: Router,) {
    // pulling for admin
    this.db.collection('admin').onSnapshot(snapshot => {
      // this.Newadmin = [];
      snapshot.forEach(Element => {
        this.admin.push(Element.data());
      });
      this.admin.forEach(item => {
        if (item.userid === firebase.auth().currentUser.uid) {
          this.Newadmin.push(item);
        }
      });
      console.log('Newadmins', this.Newadmin);
    });

   }

  ngOnInit() {
  }


add() {
let rray  = {
  Glass : [
    {gl001 : "0,5"},
  ],
  aluminium : [
    { nfal01: "1.6"},
  ],
  paper : [
    { pap005: "1.6"},
    { pap007: "1.6"},
    { pap001: "1.6"},
    { pap003: "1.6"},
  ],
  plastic : [
    { hd001: "1.6"},
    { ld001: "1.6"},
    { ld003: "1.6"},
    { pet001: "1.6"},
  ]
};
this.db.collection("prices").doc("one").set(rray).then(function() {
console.log("Document successfully written!");
});
}

Logout() {
  firebase.auth().signOut().then((res) => {
    console.log(res);
    this.route.navigateByUrl('/login');
   });
  }

}
