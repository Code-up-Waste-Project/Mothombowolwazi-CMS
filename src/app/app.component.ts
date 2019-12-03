import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [];
admin;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ionViewDidEnter(){ 

  }

  ngOnInit()
  {
    this.appPages = [];

    firebase.auth().onAuthStateChanged(user => {
      firebase.firestore().collection('userprofile').doc(firebase.auth().currentUser.uid).onSnapshot(snapshot => {
        // this.profile.email = snapshot.data().email;
       
        console.log('users', snapshot.data().isAdmin);
        this.admin=snapshot.data().isAdmin;
if(this.admin =="true")
{
this.appPages.push({
  title: 'Home',
  url: '/home',
  icon: 'home',
  admin:"hot"
},
{
  title: 'Inbound',
  url: '/analytics',
  icon: 'cash',
  admin:"cool"
},
{
  title: 'Reclaimer',
  url: '/reclaimer',
  icon: 'cash',
  admin:"cool"
});

}

else
{
  this.appPages.push(
  {
    title: 'Reclaimer',
    url: '/reclaimer',
    icon: 'cash',
    admin:"cool"
  },
  {
    title: 'Edit Prices',
    url: '/profile',
    icon: 'create',
    admin:"cool"
  });

}
     console.log(this.appPages)   
      })
    
    })

  }
}
