import { Component, ElementRef, Renderer2 } from '@angular/core';
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
    private statusBar: StatusBar,
    private content: ElementRef,
    private render: Renderer2
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

  console.log(this.content.nativeElement.children[0].children[0])
  this.render.setStyle(this.content.nativeElement.children[0].children[0], 'max-width', '80%' );
  this.render.setStyle(this.content.nativeElement.children[0].children[0], 'border-radius', '15px' );
  this.render.setStyle(this.content.nativeElement.children[0].children[0], 'box-shadow', '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' );
  this.render.setStyle(this.content.nativeElement.children[0].children[0], 'height', '80%' );
  this.render.setStyle(this.content.nativeElement.children[0].children[0], 'transform', 'translate(13%,13%)');
  this.render.setStyle(this.content.nativeElement.children[0], 'display', 'flex' );
  this.render.setStyle(this.content.nativeElement.children[0], 'justify-content', 'center');
  this.render.setStyle(this.content.nativeElement.children[0], 'align-items', 'center');
  this.render.setStyle(this.content.nativeElement.children[0], 'background-image', 'url(../assets/cover.png)');
  this.render.setStyle(this.content.nativeElement.children[0], 'background-position', 'center');
  this.render.setStyle(this.content.nativeElement.children[0], 'background-size', 'cover');
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
  title: 'Inbounds',
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
    url: '/editPrice',
    icon: 'create',
    admin:"cool"
  });

}
     console.log(this.appPages)   
      })
    
    })

  }
}
