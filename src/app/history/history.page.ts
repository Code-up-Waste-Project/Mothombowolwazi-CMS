import { ModalpopupPage } from './../modalpopup/modalpopup.page';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

    db = firebase.firestore();

    // Reclaimer
    reclaimerID;
    reclaimername;
    reclaimersurname;
    reclaimerDate;

    // OutBound
    id;
    outdate;
    outDriverName;
    outRegistarionNumberPlates;
    outovarallMass;

    newreclaimer = [];
    outbound = [];

  constructor(
    private modalCTRL: ModalController,
  ) {
    this.db.collection('reclaimers').onSnapshot(snapshot => {
      snapshot.forEach(element => {
        let id = {};
        let reclaimername = {};
        let reclaimersurname = {};
        let reclaimerDate = {};

        id = this.id = element.id;
        reclaimername = this.reclaimername = element.data().name;
        reclaimersurname = this.reclaimersurname = element.data().surname;
        reclaimerDate = this.reclaimerDate = element.data().date;

        // this.newreclaimer = [];
        this.newreclaimer.push({
          id: id,
          reName: reclaimername,
          reSurname: reclaimersurname,
          reDate: reclaimerDate,
        });
        console.log(this.newreclaimer);
      });
    });

    this.db.collection('outbound').onSnapshot(snapshot => {
      snapshot.forEach(element => {
        let id = {};
        let outdate = {};
        let outDriverName = {};
        let outRegistarionNumberPlates = {};
        let outovarallMass = {};

        id = this.id = element.id;
        outdate = this.outdate = element.data().date;
        outDriverName = this.outDriverName = element.data().DriverName;
        outRegistarionNumberPlates = this.outRegistarionNumberPlates = element.data().RegistarionNumberPlates;
        outovarallMass = this.outovarallMass = element.data().ovarallMass;

        // this.outbound = [];
        this.outbound.push({
          id: id,
          outDate: outdate,
          outdriverName: outDriverName,
          outRegistarionNo: outRegistarionNumberPlates,
          outovarallmass: outovarallMass,
        });
        console.log(this.outbound);
      });
    });

    // this.db.collection('outbound').onSnapshot(snapshot => {
    //     //  this.profile.name = snapshot.docs.name
    //       snapshot.forEach(item => {
    //         this.outbound.push(item.data());
    //         console.log("my outbound", this.outbound);
    //       });
    //     })

    }

    ngOnInit() {
    }

    async openReclaimer() {
      let modal =  await this.modalCTRL.create({
        component: ModalpopupPage,
        cssClass: 'cart-modal'
      });
      modal.present();
    }

    async openOutbound() {
      let modal =  await this.modalCTRL.create({
        component: ModalpopupPage,
        cssClass: 'cart-modal'
      });
      modal.present();
    }


}
