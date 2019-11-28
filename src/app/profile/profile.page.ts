import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userprofile=[];
  newuserprofile=[]
    db =firebase.firestore();
    profiles
    profile={
  image:null,
  name:null,
  addres:null,
  surname:null, 
  position:null,
  userid:firebase.auth().currentUser.uid,
  email:firebase.auth().currentUser.email
    
    }
  storage: any;
  constructor(private router:Router) { 

    firebase.auth().onAuthStateChanged(user => {
      this.db.collection('userprofile').doc(firebase.auth().currentUser.uid).onSnapshot(snapshot => {
        // this.profile.email = snapshot.data().email;
        email: firebase.auth().currentUser.email,
        this.profile.name = snapshot.data().name;
        this.profile.surname = snapshot.data().surname;
        this.profile.position = snapshot.data().position;
        console.log('users', this.userprofile);
        
      })
    })

  }

  ngOnInit() {
  }
  users(){
    this.db.collection('userprofile').doc(firebase.auth().currentUser.uid).set({
      name: this.profile.name,
      surname: this.profile.surname,
      email: this.profile.email,
      position:this.profile.position,
      userid: this.profile.userid
      
    })
    .then(function() {
      console.log("Document successfully written!");
     
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
    this.router.navigateByUrl('/home');
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
