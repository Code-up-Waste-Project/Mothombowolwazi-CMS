
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

  public signupForm: FormGroup;
  public loading: any;
   db = firebase.firestore();
  constructor( private router:Router) 
  { 
    
  }



  user =
  {
    email :"",
  password :""
  }
  ​
  fun(user)
  {
  console.log(user)
  firebase.auth().createUserWithEmailAndPassword(user.email,user.password).then(result => {
    console.log("uid =",result.user.uid);

   
  ​
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
  ​
  if(user.email ==""&& user.password =="" && user.email.search('@') <0 &&  user.password.length<6 ) 
  {
    console.log("user email",user.email.search('@'))
    // const toast =  this.toastCtrl.create({
    //   message: 'Enter email address with a correct format and a password with a minimum of 6 characters!',
    //   duration: 8000
    // });
    // toast.present();
  }
  else{
  ​
    // const toast =  this.toastCtrl.create({
    //   message: 'Registration Successful!',
    //   duration: 9000
    // });
    // toast.present();
  // ​
  //   const loading = this.loadingController.create({
  //     duration: 9000
  //   });
  //   loading.present()
  ​
  ​this.router.navigateByUrl('/profile')
  }
  }
  










  ngOnInit() {
  }

}
