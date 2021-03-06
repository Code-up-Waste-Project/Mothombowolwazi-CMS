import { element } from 'protractor';
import { ModalpopupPage } from './../modalpopup/modalpopup.page';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ModalController } from '@ionic/angular';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

    db = firebase.firestore();

    // user infor
    admin = [];
    Newadmin = [];

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
    public route: Router,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController
  ) {
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
      // console.log('Newadmins', this.Newadmin);
    });

    // pulling from reclaimers
    this.db.collection('reclaimers').onSnapshot(snapshot => {
      this.newreclaimer = [];
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
        // console.log(this.newreclaimer);
      });
    });

    // pulling from outbound
    this.db.collection('outbound').onSnapshot(snapshot => {
      this.outbound = [];
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
        // this.outbound.push(element.data());
        // console.log(this.outbound);
      });
    });
    }

    ngOnInit() {
    }

    deleteOutbound(id) {
      this.db.collection('outbound').doc(id).delete();
    }

    async presentAlertdeleteOutbound(id) {
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: '<strong>Are you sure you want to erase data? data will not be saved.</strong>!!!',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Okay',
            handler: () => {
              this.deleteOutbound(id);
              this.route.navigateByUrl('/history');
              console.log('Confirm Okay');
            }
          }
        ]
      });
      await alert.present();
    }

    deleteReclaimer(id) {
      this.db.collection('reclaimers').doc(id).delete();
    }

    async presentAlertdeleteReclaimer(id) {
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: '<strong>Are you sure you want to erase data? data will not be saved.</strong>!!!',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Okay',
            handler: () => {
              this.deleteReclaimer(id);
              this.route.navigateByUrl('/history');
              console.log('Confirm Okay');
            }
          }
        ]
      });
      await alert.present();
    }

    async openReclaimer() {
      let modal =  await this.modalCTRL.create({
        component: ModalpopupPage,
        cssClass: 'cart-modal'
      });
      modal.present();
    }

    Logout() {
      firebase.auth().signOut().then((res) => {
        console.log(res);
        this.route.navigateByUrl('/login');
       });
      }

}
