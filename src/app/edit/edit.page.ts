import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
db=firebase.firestore();
  constructor() { }

  ngOnInit() {
  }


add(){
//   var docData = {

//     arrayExample: 5, true, "hello"],
//     objectExample: {
//         a: 5,
//         b: {
//             nested: "foo"
//         }
//     }
// };

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
}
  this.db.collection("prices").doc("one").set(rray).then(function() {
    console.log("Document successfully written!");
});

}
}
