import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-editprice',
  templateUrl: './editprice.page.html',
  styleUrls: ['./editprice.page.scss'],
})
export class EditpricePage implements OnInit {

  pricess = {
    gl001: null,
    hd001: null,
    pap005: null,
    pap007: null,
    pap001: null,
    pap003: null,
    ld003: null,
    nfalo1: null,
    pet005: null,
    pet003: null,
    pet001: null,
  };

  db = firebase.firestore();
  price = [];
  prices;

  constructor() {
    this.prices = this.db.collection('price').doc("SinUfRNnbB073KZiDIZE");
    this.prices.get().then((documentSnapshot) => {
      this.price = [];
      console.log(documentSnapshot.data());
      this.price.push(documentSnapshot.data());
      console.log(this.price);
      this.pricess.gl001 = documentSnapshot.data().gl001;
      this.pricess.hd001 = documentSnapshot.data().hd001;
      this.pricess.ld003 = documentSnapshot.data().ld003;
      this.pricess.nfalo1 = documentSnapshot.data().nfalo1;
      this.pricess.pap001 = documentSnapshot.data().pap001;
      this.pricess.pap003 =documentSnapshot.data().pap003;
      this.pricess.pap005 = documentSnapshot.data().pap005;
      this.pricess.pet001= documentSnapshot.data().pet001;
     this.pricess.pet003=documentSnapshot.data().pet003;
     this.pricess.pet005=documentSnapshot.data().pet005;
    });
   }

  ngOnInit() {
  }

  update(pricess){
    console.log(pricess)
    
    // To update age and favorite color:
    this.db.collection("price").doc("SinUfRNnbB073KZiDIZE").update({
      gl001:pricess.gl001,
      hd001:pricess.hd001,
      ld003:pricess.ld003,
      nfalo1:pricess.nfalo1,
      pap005: pricess.pap005,
      pap001:pricess.pap001,
      pap003: pricess.pap003,
      pet001:pricess.pet001,
      pet005:pricess.pet005,
      pet003:pricess.pet003
    })
    .then((data) => {
      console.log("Document successfully updated!");
    });
    }

}
