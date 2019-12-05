import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../app/user/auth.service';
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
db=firebase.firestore()
  profile={
    image:null,
    name:null,
    addres:null,
    surname:null, 
    position:null,
    isAdmin: null,
  
    // userid: firebase.auth().currentUser.uid,
    // email: firebase.auth().currentUser.email
      }
  public signupForm: FormGroup;
  public loading: any;
  constructor(
    public platform : Platform,
    public authService: AuthService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public router: Router
    ) { 
      this.signupForm = this.formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: [
          '',
          Validators.compose([Validators.minLength(6), Validators.required])
        ]
      });
    }

  ngOnInit() {}

  
  async signupUser(signupForm: FormGroup): Promise<void> {

    // signup(email, password, name, surname) {
    //   return firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
    //     if (user) {
    //       this.userId = user['user'].uid;
    //       this.userDocumentNo = user['user'].uid;
    //       this.email = user['user'].email;
    //       console.log(this.userDocumentNo);
  
    //     // inserting into database
    //       firebase.firestore().collection('users/').doc(this.userId).set({
    //       username: name,
    //       surnamez: surname,
    //       emails: email,
    //       hasProfilePic: false,
    //       });
    //     }
    //     return user;
    //   }).catch((error) => {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     return errorMessage;
    //     // ...resetepassword
    //   });
    // }
  
    this.db.collection('userprofile').doc(firebase.auth().currentUser.uid).set({
      name: this.profile.name,
     surname: this.profile.surname,
      // email: this.profile.email,
      position:this.profile.position,
      //  userid: this.profile.userid,
      //  image: this.profile.image,
       isAdmin: this.profile.isAdmin
      
    })
    .then(function() {
      console.log("Document successfully written!");
     
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });

    console.log('Method is called');

    if (!signupForm.valid) {
      console.log(
        'Need to complete the form, current value: ',
        signupForm.value
      );
    } else {
      const email: string = signupForm.value.email;
      const password: string = signupForm.value.password;

      this.authService.signupUser(email, password).then(
        () => {
          this.loading.dismiss().then(() => {
            // this.router.navigateByUrl('profile');
            this.router.navigateByUrl('profile');
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }]
            });
            await alert.present();
          });
        }
      );
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
    }
  }





  goToLogin() {
    this.router.navigate(['login']);
  }
  
}
