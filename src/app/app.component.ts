import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
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
    private statusBar: StatusBar,
    private content: ElementRef,
    private render: Renderer2
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    console.log(this.content.nativeElement);
    this.render.setStyle(this.content.nativeElement.children[0], 'width', '80%' );
    this.render.setStyle(this.content.nativeElement.children[0], 'height', '80%' );
    this.render.setStyle(this.content.nativeElement, 'background-image', 'url(../assets/cover.png)');

    this.render.setStyle(this.content.nativeElement.children[0], 'box-shadow', ' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' );    this.render.setStyle(this.content.nativeElement.children[0], 'transform', 'translate(12%, 12%)');
    this.render.setStyle(this.content.nativeElement.children[0], 'border-radius', '15px');
    //this.render.setStyle(this.content.nativeElement.children[0], 'border', '2px solid red');
    this.render.setStyle(this.content.nativeElement.children[0], 'display', 'flex' );
    this.render.setStyle(this.content.nativeElement.children[0], 'justify-content', 'center');
    this.render.setStyle(this.content.nativeElement.children[0], 'align-items', 'center');

    this.render.setStyle(this.content.nativeElement.children[0], 'background-position', 'center');
    this.render.setStyle(this.content.nativeElement.children[0], 'background-size', 'cover');
    this.render.setStyle(this.content.nativeElement.children[0], 'object-fit', '2%' );
    this.appPages = [];

    firebase.auth().onAuthStateChanged(user => {
      firebase.firestore().collection('admin').doc(firebase.auth().currentUser.uid).onSnapshot(snapshot => {
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
  title: 'Inbounds',
  url: '/analytics',
  icon: 'arrow-round-back',
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
    icon: 'home2',
    admin:"cool"
  },
  {
    title: 'Edit Prices',
    url: '/editprice',
    icon: 'edit',
    admin:"cool"
  }, {
    title: 'Inbound',
    url: '/analytics',
    icon: 'inbound',
    admin:"cool"
  }, {
    title: 'Outbound',
    url: '/outbound',
    icon: 'dispatch',
    admin:"cool"
  }, {
    title: 'Reclaimer',
    url: '/reclaimer',
    icon: 'reclaimer2',
    admin:"cool"
  }, {
    title: 'History',
    url: '/history',
    icon: 'filing',
    admin:"cool"
  }, {
    title: 'Manage Users',
    url: '/register',
    icon: 'people',
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

