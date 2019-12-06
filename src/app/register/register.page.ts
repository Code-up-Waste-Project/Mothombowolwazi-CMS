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

  userprofile;
  newuserprofile = [];
  db = firebase.firestore();
  profiles;
  profile = {
    image: null,
    name: null,
    addres: null,
    surname: null,
    position: null,
    // isAdmin: null,
    // userid: firebase.auth().currentUser.uid,
    // email: firebase.auth().currentUser.email
      };
  public signupForm: FormGroup;
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
        // name: ['', Validators.compose([Validators.required, Validators.name])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      });

      this.db.collection('userprofile').onSnapshot(snapshot => {
      //  this.profile.name = snapshot.docs.name
        // this.profile.email = snapshot.data().email;
        // email: firebase.auth().currentUser.email,
        // this.profile.name = snapshot.data().name;
        // this.profile.surname = snapshot.data().surname;
        // this.profile.position = snapshot.data().position;
        // // this.profile.image = snapshot.data().image;
        // console.log('users', this.userprofile);
       snapshot.forEach(item => {
        this.newuserprofile.push(item.data());
        console.log("Users ", this.newuserprofile);
        });
      });
      
      this.db.collection('userprofile').onSnapshot(snapshot => {
       
      //  this.profile.name = snapshot.docs.name
        // this.profile.email = snapshot.data().email;
        // email: firebase.auth().currentUser.email,
        // this.profile.name = snapshot.data().name;
        // this.profile.surname = snapshot.data().surname;
        // this.profile.position = snapshot.data().position;
        // // this.profile.image = snapshot.data().image;
        // console.log('users', this.userprofile);
        snapshot.forEach(item => {
       
          this.newuserprofile.push(item.data());
          console.log("Users ",this.newuserprofile);
          
        })
      });
      
            
    }
    user = {
      email: "",
      password: "",
    };

  ngOnInit() {}

  async signupUser(signupForm: FormGroup): Promise<void> {
    if (this.profile.name == "" || this.profile.name == undefined) {
      const toast = await this.toastController.create({
        message: 'Enter the name.',
        duration: 2000
      });
      toast.present();
    } else if (this.profile.surname == "" || this.profile.surname == undefined) {
      const toast = await this.toastController.create({
        message: 'Enter the surname',
        duration: 2000
      });
      toast.present();
    } else if (this.profile.position == "" || this.profile.position == undefined) {
      const toast = await this.toastController.create({
        message: 'Enter the position.',
        duration: 2000
      });
      toast.present();
    } else {
      this.db.collection('userprofile').doc('workers').set({
        name: this.profile.name,
      //  surname: this.profile.surname,
      //   // email: this.profile.email,
      //   position:this.profile.position,
      //    userid: this.profile.userid,
        //  image: this.profile.image,
        //  isAdmin: this.profile.isAdmin
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
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
  delete() {
    this.newuserprofile = [];
    // this.Booking = [];
    this.db.collection("userprofile").doc("workers").delete().then(function() {
      console.log("Document successfully deleted!");
      this.router.navigate(['home']);
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  }



    this.db.collection("userprofile").doc(x.userUid).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
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