import { Component, OnInit, Renderer2, NgZone, Directive } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormsModule } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../user/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService } from '../../app/user/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
db=firebase.firestore()
  constructor(private router:Router) { }

export class LoginPage implements OnInit {
db=firebase.firestore()
  constructor(private router:Router) { }
​
  user =
  {
    email :"",
  password :""
  }
​
  ngOnInit() {
    setTimeout(() => {
      this.splashscreen.hide();
          }, 2000);
    this.splashscreen.hide();
  }


  fun(user)
  {




  //   <ion-button *ngif="isAdmin" routerlink="/event-create">
  //   Create a new Event
  // </ion-button>





  console.log(user)
  firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(result => {


  this.db.collection('userprofile').doc(firebase.auth().currentUser.uid).get().then(res =>{

if (res.exists){
  this.router.navigateByUrl('/home')
 
}else{
  this.router.navigateByUrl('/profile')
}
    })
    console.log(result.user.uid,result.user.email,'user logged in');
    // this.slist.email = result.user.email;
    // console.log(this.lsname)
    if(result.user.uid >"")
    {
  //     const toast =  this.toastCtrl.create({
  //       message: 'Login Successful!',
  //       duration: 9000
  //     });
  // toast.present();
    ​this.router.navigateByUrl('/home')
    }
  }

   async forgetpassword() {

    // this.router.navigate(['reset-password']);

    const alert = await this.alertCtrl.create({
      header: 'Please enter your E-mail',
      inputs: [
        
        {
          name: 'name',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            firebase.auth().sendPasswordResetEmail(data.name).then(
              async () => {
                const alert = await this.alertCtrl.create({
                  message: 'Check your email for a password reset link',
                  buttons: [
                    {
                      text: 'Ok',
                      role: 'cancel',
                      handler: () => {
                        this.router.navigateByUrl('login');
                      }
                    }
                  ]
                });
                await alert.present();
              },
              async error => {
                const errorAlert = await this.alertCtrl.create({
                  message: error.message,
                  buttons: [{ text: 'Ok', role: 'cancel' }]
                });
                await errorAlert.present();
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }

  async goToRegister(){
    this.router.navigate(['register']);
  }



  signup()
  { 
  ​this.router.navigateByUrl('/home')
  }
}
