import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public appPages = [];
admin;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.appPages = [];

    firebase.auth().onAuthStateChanged(user => {
      firebase.firestore().collection('userprofile').doc(firebase.auth().currentUser.uid).onSnapshot(snapshot => {
        // this.profile.email = snapshot.data().email;

        console.log('users', snapshot.data().isAdmin);
        this.admin = snapshot.data().isAdmin;
        if (this.admin == "true") {
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
} else {
  this.appPages.push(
  {
    title: 'home',
    url: '/home',
    icon: 'cash',
    admin:"cool"
  },
  {
    title: 'Edit Prices',
    url: '/editprice',
    icon: 'create',
    admin:"cool"
  }, {
    title: 'Outbound',
    url: '/outbound',
    icon: 'cash',
    admin:"cool"
  },{
    title: 'Reclaimer',
    url: '/reclaimer',
    icon: 'cash',
    admin:"cool"
  }, {
    title: 'History',
    url: '/home',
    icon: 'cash',
    admin:"cool"
  }, {
    title: 'Users',
    url: '/register',
    icon: 'cash',
    admin:"cool"
  }, {
    title: 'Log Out',
    url: '/home',
    icon: 'cash',
    admin:"cool"
  },
  );
}
        console.log(this.appPages);
      });
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}

