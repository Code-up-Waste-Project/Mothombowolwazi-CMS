import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
//import { AuthService } from '../../app/user/auth.service';
​
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
db=firebase.firestore()
  constructor(private router:Router) { }

  user =
  {
    email :"",
  password :""
  }

  ngOnInit() {
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
  {
  }
  }).catch((error) => {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    // let alert = this.alertCrtl.create({
    // title: errorCode,
    //   subTitle: errorMessage,
    //   buttons: ['Try Again']
    // })
    // alert.present();
   // ...
  });
  }



  signup()
  { 
  ​this.router.navigateByUrl('/home')
  }
}