import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../app/user/auth.service';
import { LoadingController, AlertController, Platform, ToastController  } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public signupForm: FormGroup;
  storage = firebase.storage().ref();
  admin = [];
  Newadmin = [];
  userprofile;
  newuserprofile = [];
  db = firebase.firestore();
  profiles;
  profile = {

  image: 'https://firebasestorage.googleapis.com/v0/b/https://gs://mthombowolwazi-a7902.appspot.com/mthombologo (1).png',
    name: null,
    addres: null,
    surname: null,
    position: null,
    // isAdmin: null,
    // userid: firebase.auth().currentUser.uid,
    email: null,
    password: null,
      };
  public loading: any;

  constructor(
    public platform: Platform,
    public authService: AuthService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public router: Router,
    private toastController: ToastController
    ) {
      this.signupForm = this.formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
        name: ['', [Validators.required, ]],
        surname: ['', [Validators.required, ]],
        position: ['', [Validators.required, ]],
      });

      this.db.collection('admin').onSnapshot(snapshot => {
        this.Newadmin = [];
        snapshot.forEach(Element => {
          this.admin.push(Element.data());
        });
        this.admin.forEach(item => {
          if (item.userid === firebase.auth().currentUser.uid) {
            this.Newadmin.push(item);     }
        });
        console.log('Newadmins', this.Newadmin);
      });
    }

  ngOnInit() {
    this.db.collection('userprofile2').onSnapshot(snapshot => {
        // this.profile.name = snapshot.docs.name
        // this.profile.email = snapshot.data().email;
        // email: firebase.auth().currentUser.email,
        // this.profile.name = snapshot.data().name;
        // this.profile.surname = snapshot.data().surname;
        // this.profile.position = snapshot.data().position;
        // // this.profile.image = snapshot.data().image;
        // console.log('users', this.userprofile);
        snapshot.forEach(item => {
          this.newuserprofile.push(item.data());
          console.log("user profile ", this.newuserprofile);
        });
      });
  }

  async signupUser(signupForm: FormGroup): Promise<void> {
    this.authService.profile = {...signupForm.value, ...{image: this.profile.image}};
    console.log(signupForm.value);
    console.log(this.profile.image);
    this.db.collection('userprofile').add({
          name: this.profile.name,
         surname: this.profile.surname,
          email: signupForm.value.email,
          position: this.profile.position,
          // userUid:firebase.auth().currentUser.uid,
        //    userid: this.profile.userid,
           image: this.profile.image,
           password: signupForm.value.password.toString()
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
        error => {
          this.db.collection('userprofile2').doc(firebase.auth().currentUser.uid).delete();
          this.newuserprofile = [];
          this.db.collection('userprofile2').onSnapshot(snapshot => {
              snapshot.forEach(item => {
                this.newuserprofile.push(item.data());
                console.log("user profile ",this.newuserprofile);
              })
            });

          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }]
            });
            await alert.present();
          });
        }

    console.log('Method is called');
    if (!signupForm.valid) {
          console.log(
            'Need to complete the form, current value: ',
            signupForm.value
          );
        } else {
          const email: string = signupForm.value.email;
          const password: string = signupForm.value.password;
          const surname: string = signupForm.value.surname;
          const position: string = signupForm.value.position;
          const name: string = signupForm.value.name;
          this.authService.signupUser(email, password).then(
            () => {
              this.loading.dismiss().then(() => {
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

      delete(x) {
        console.log(x);
        this.newuserprofile = [];
        let email = x.email;
        // this.Booking = [];
        this.db.collection("userprofile2").doc(x.userUid).delete().then(function() {
          console.log("Document successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
        this.db.collection("userprofile2").get().then(res => {
        res.forEach(res => {
          this.newuserprofile.push({...{userUid: res.id}, ...res.data()});
        });
      });
      }

    changeListener(profile): void {
      const i = profile.target.files[0];
      console.log(i);
      const upload = this.storage.child(i.name).put(i);
      upload.on('state_changed', snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('upload is: ', progress , '% done.');
      }, err => {
      }, () => {
        upload.snapshot.ref.getDownloadURL().then(dwnURL => {
          console.log('File avail at: ', dwnURL);
          this.profile.image = dwnURL;
        });
      });
    }

}
