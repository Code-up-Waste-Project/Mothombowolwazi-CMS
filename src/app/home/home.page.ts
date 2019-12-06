import {ModalpopupPageModule} from './../modalpopup/modalpopup.module';
import { ModalpopupPage } from './../modalpopup/modalpopup.page';
import { Component, OnInit  } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import {  ViewChild } from '@angular/core';
// import { ModalpopupPage } from '../modalpopup/modalpopup.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('barChart', {static: false}) barChart;
  // @ViewChild('barChart') barChart;

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

  constructor(
    private modalcontroller: ModalController
    )
     {}


     ionViewDidEnter() {
      this.createBarChart();
    }
    createBarChart() {
      this.bars = new Chart(this.barChart.nativeElement, {
        type: 'bar',
        data: {
          labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
          datasets: [{
            label: 'Viewers in millions',
            data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
            backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1
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
  }

}
