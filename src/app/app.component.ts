import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Reclaimer',
      url: '/reclaimer',
      icon: 'cash'
    },
    {
      title: 'Edit Prices',
      url: '/editprice',
      icon: 'create'
    },
    {
      title: 'Inbounds',
      url: '/analytics',
      icon: 'analytics'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'login'
    },
    {
      title: 'Signin',
      url: '/signin',
      icon: 'signin'
    },
    {
      title: 'regsiter',
      url: '/register',
      icon: 'register'
    },
    {
      title: 'profile',
      url: '/profile',
      icon: 'profile'
    },
  ];

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
}
