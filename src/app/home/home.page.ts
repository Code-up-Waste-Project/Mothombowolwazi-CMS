import {ModalpopupPageModule} from './../modalpopup/modalpopup.module';
import { ModalpopupPage } from './../modalpopup/modalpopup.page';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController, ModalController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { log } from 'util';
import { Chart } from 'chart.js';
// import { ModalpopupPage } from '../modalpopup/modalpopup.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

@ViewChild('barChart', {static: false}) barChart;
bars: any;
colorArray: any;

  db = firebase.firestore();
  profiles;
  profile = {
  image: null,
  name: null,
  addres: null,
  surname: null,
  position: null,
  isAdmin: true,
  // userid:firebase.auth().currentUser.uid,
  // email:firebase.auth().currentUser.email
    };
  isAdmin: any;

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

  Totalpaper;
  Totalplastic;

  constructor(
    private modalcontroller: ModalController,
    private menuCtrl: MenuController,
    ) {
      this.getMasses();
    }

    //chart
    ionViewDidEnter() {
      this.createBarChart();
    }

  openModal() {
    this.modalcontroller.create({component: ModalpopupPage}).then((modalElement) => {
    modalElement.present();
    });
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
    this.menuCtrl.enable(true); // or true 
  }

  getMasses() {
    this.db.collection('storage').onSnapshot(snapshot => {
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
      console.log(this.GH001storagemass);
      console.log(this.NFAL01storagemass);
      console.log(this.PAP005storagemass);
      console.log(this.PAP007storagemass);
      console.log(this.PAP001storagemass);
      console.log(this.PAP003storagemass);
      console.log(this.HD001storagemass);
      console.log(this.LD001storagemass);
      console.log(this.LD003storagemass);
      console.log(this.PET001storagemass);
      console.log(this.PET003storagemass);
      console.log(this.PET005storagemass);
    });
    this.Totalpaper = +this.PAP005storagemass + +this.PAP007storagemass + +this.PAP001storagemass + +this.PAP003storagemass;
    this.Totalplastic = +this.HD001storagemass + +this.LD001storagemass + +this.LD003storagemass + +this.PET001storagemass +
    +this.PET003storagemass + +this.PET005storagemass;
    console.log(this.Totalpaper);
    console.log(this.Totalplastic);
  }

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Aluminium', 'Glass', 'Paper', 'Plastic'],

        datasets: [{
          label: 'Overall material ',
          data: [345.8, 37.8, 50.4, 69.9],
backgroundColor:[ 'green', 'yellow', 'blue', 'red'], 
// backgroundColor: yellow,// array should have same number of elements as number of dataset
          borderColor: 'green',// array should have same number of elements as number of dataset
          borderWidth: 3

        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
