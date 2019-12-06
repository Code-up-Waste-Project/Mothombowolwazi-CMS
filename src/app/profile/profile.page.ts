import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userprofile = [];
  newuserprofile = [];
  db = firebase.firestore();
  profiles;
  profile = {
  image: null,
  name: null,
  addres: null,
  surname: null,
  isAdmin: null,

  userid: firebase.auth().currentUser.uid,
  email: firebase.auth().currentUser.email
    };

  // storage: any;
  constructor(
    private router: Router,
    private toastController: ToastController
    ) {
      this.db.collection('userprofile').doc(firebase.auth().currentUser.uid).onSnapshot(snapshot => {
        // this.profile.email = snapshot.data().email;
        email: firebase.auth().currentUser.email,
        this.profile.name = snapshot.data().name;
        this.profile.surname = snapshot.data().surname;
        // this.profile.image = snapshot.data().image;
        console.log('users', this.userprofile);
      });
  }

  ngOnInit() {
  }

  async users() {
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
    } else {
    this.db.collection('userprofile').doc(firebase.auth().currentUser.uid).set({
      name: this.profile.name,
     surname: this.profile.surname,
      email: this.profile.email,
      // position: this.profile.position,
       userid: this.profile.userid,
      //  image: this.profile.image,
       isAdmin: this.profile.isAdmin
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
    this.router.navigateByUrl('/home');
  }
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


  update(pricess) {
    console.log(pricess);
    // To update age and favorite color:
    this.db.collection("price").doc("SinUfRNnbB073KZiDIZE").update({
      name: pricess.gl001,
      surname: pricess.hd001,
      position: pricess.ld003,
      email: pricess.nfalo1,
    })
    .then((data) => {
      console.log("Document successfully updated!");
    });
    }

}
