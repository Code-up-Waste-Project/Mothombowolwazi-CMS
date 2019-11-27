import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { LoadingController, AlertController } from '@ionic/angular';
import { Users } from '../users/users';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user =  {} as Users;
  alertController: any;

  constructor(
    public router: Router,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  async createRegister() {
    if (this.user.email === undefined && this.user.password === undefined) {
      const alert = await this.alertController.create({
        header: 'Alert',
        subHeader: 'Subtitle',
        message: 'This is an alert message.',
        buttons: ['OK']
      });

      await alert.present();
    } else {
      firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password).then((result) => {
        this.router.navigateByUrl('/profiles');
      });
    }
  }

}
