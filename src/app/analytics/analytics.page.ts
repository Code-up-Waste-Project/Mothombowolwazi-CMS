import { Component, OnInit } from '@angular/core';
import {ModalpopupPageModule} from './../modalpopup/modalpopup.module';
import * as firebase from 'firebase';
import { AlertController, LoadingController, ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.page.html',
  styleUrls: ['./analytics.page.scss'],
})
export class AnalyticsPage implements OnInit {

  db = firebase.firestore();

  GH001;
  NFAL01;
  PAP005;
  PAP007;
  PAP001;
  PAP003;
  HD001;
  LD001;
  LD003;
  PET001;
  PET003;
  PET005;

  GH001mass: 0;
  NFAL01mass: 0;
  PAP005mass: 0;
  PAP007mass: 0;
  PAP001mass: 0;
  PAP003mass: 0;
  HD001mass: 0;
  LD001mass: 0;
  LD003mass: 0;
  PET001mass: 0;
  PET003mass: 0;
  PET005mass: 0;

  storageGH001;
  storageNFAL01;
  storagePAP005;
  storagePAP007;
  storagePAP001;
  storagePAP003;
  storageHD001;
  storageLD001;
  storageLD003;
  storagePET001;
  storagePET003;
  storagePET005;

  GH001storagemass;
  NFAL01storagemass;
  PAP005storagemass;
  PAP007storagemass;
  PAP001storagemass;
  PAP003storagemass;
  HD001storagemass;
  LD001storagemass;
  LD003storagemass;
  PET001storagemass;
  PET003storagemass;
  PET005storagemass;

  constructor(
    private modalcontroller: ModalController,
    public route: Router,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
  }

  getMasses() {
    this.db.collection('storage').onSnapshot(snapshot => {
      snapshot.forEach(element => {
        this.GH001storagemass = element.data().GL001;
        this.NFAL01storagemass = element.data().NFAL01;
        this.PAP005storagemass = element.data().PAP005;
        this.PAP007storagemass = element.data().PAP007;
        this.PAP001storagemass = element.data().PAP001;
        this.PAP003storagemass = element.data().PAP003;
        this.HD001storagemass = element.data().HD001;
        this.LD001storagemass = element.data().LD001;
        this.LD003storagemass = element.data().LD003;
        this.PET001storagemass = element.data().PET001;
        this.PET003storagemass = element.data().PET003;
        this.PET005storagemass = element.data().PEP005;
        // console.log(element);
      });
      console.log(this.GH001storagemass);
      console.log(this.NFAL01storagemass);
      console.log(this.PAP005storagemass);
      console.log(this.PAP007storagemass);
      console.log(this.PAP001storagemass);
      console.log(this.PAP003storagemass);
      console.log(this.HD001storagemass);
      console.log(this.LD001storagemass);
      console.log(this.LD003storagemass);
      console.log(this.PET001storagemass);
      console.log(this.PET003storagemass);
      console.log(this.PET005storagemass);
    });
  }

  SaveGH001() {
    // storageGH001
    this.storageGH001 = this.GH001storagemass + this.GH001mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({GL001: this.storageGH001});
    console.log(this.storageGH001);
    this.presentToast();
  }

  SaveNFAL01() {
    // storage NFAL01;
    this.storageNFAL01 = this.NFAL01storagemass + this.NFAL01mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({NFAL01: this.storageNFAL01});
    console.log(this.storageNFAL01);
    this.presentToast();
  }

  SavePAP005() {
    // storage PAP005;
    this.storagePAP005 = this.PAP005storagemass + this.PAP005mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PAP005: this.storagePAP005});
    console.log(this.storagePAP005);
    this.presentToast();
  }

  SavePAP007() {
    // storage PAP007;
    this.storagePAP007 = this.PAP007storagemass + this.PAP007mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PAP007: this.storagePAP007});
    console.log(this.storagePAP007);
    this.presentToast();
  }

  SavePAP001() {
    // storage PAP001;
    this.storagePAP001 = this.PAP001storagemass + this.PAP001mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PAP001: this.storagePAP001});
    console.log(this.storagePAP001);
    this.presentToast();
  }

  SavePAP003() {
    // storage PAP003;
    this.storagePAP003 = this.PAP003storagemass + this.PAP003mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PAP003: this.storagePAP003});
    console.log(this.storagePAP003);
    this.presentToast();
  }

  SaveHD001() {
    // storage HD001;
    this.storageHD001 = this.HD001storagemass + this.HD001mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({HD001: this.storageHD001});
    console.log(this.storageHD001);
    this.presentToast();
  }

  SaveLD001() {
    // storage LD001;
    this.storageLD001 = this.LD001storagemass + this.LD001mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({LD001: this.storageLD001});
    console.log(this.storageLD001);
    this.presentToast();
  }

  SaveLD003() {
    // storage LD003;
    this.storageLD003 = this.LD003storagemass + this.LD003mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({LD003: this.storageLD003});
    console.log(this.storageLD003);
    this.presentToast();
  }

  SavePET001() {
    // storage PET001;
    this.storagePET001 = this.PET001storagemass + this.PET001mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PET001: this.storagePET001});
    console.log(this.storagePET001);
    this.presentToast();
  }

  SavePET003() {
    // storage PET003;
    this.storagePET003 = this.PET003storagemass + this.PET003mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PET003: this.storagePET003});
    console.log(this.storagePET003);
    this.presentToast();
  }

  SavePET005() {
    // storage PET005;
    this.storagePET005 = this.PET005storagemass + this.PET005mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PEP005: this.storagePET005});
    console.log(this.storagePET005);
    this.presentToast();
  }

  async presentAlert(data) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: data,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'New Added to Storage Created.',
      duration: 5000,
      color: 'primary',
      position: 'bottom'
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading',
    });
    await loading.present();
    loading.dismiss();
  }

  swiperCont = document.getElementsByClassName('swiper-container')
  slideOpts = {
   slidesPerView: 1,
   coverflowEffect: {
     rotate: 50,
     stretch: 20,
     depth: 200,
     modifier: 3,
     slideShadows: true,
     initialSlide: 2
   },
   on: {
     beforeInit() {
       const swiper = this;
  
       swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
       swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
  
       swiper.params.watchSlidesProgress = true;
       swiper.originalParams.watchSlidesProgress = true;
     },
     setTranslate() {
       const swiper = this;
       const {
         width: swiperWidth, height: swiperHeight, slides, $wrapperEl, slidesSizesGrid, $
       } = swiper;
       const params = swiper.params.coverflowEffect;
       const isHorizontal = swiper.isHorizontal();
       const transform$$1 = swiper.translate;
       const center = isHorizontal ? -transform$$1 + (swiperWidth / 2) : -transform$$1 + (swiperHeight / 2);
       const rotate = isHorizontal ? params.rotate : -params.rotate;
       const translate = params.depth;
       // Each slide offset from center
       for (let i = 0, length = slides.length; i < length; i += 1) {
         const $slideEl = slides.eq(i);
         const slideSize = slidesSizesGrid[i];
         const slideOffset = $slideEl[0].swiperSlideOffset;
         const offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;
  
          let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
         let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
         // var rotateZ = 0
         let translateZ = -translate * Math.abs(offsetMultiplier);
  
          let translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
         let translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;
  
          // Fix for ultra small values
         if (Math.abs(translateX) < 0.001) translateX = 0;
         if (Math.abs(translateY) < 0.001) translateY = 0;
         if (Math.abs(translateZ) < 0.001) translateZ = 0;
         if (Math.abs(rotateY) < 0.001) rotateY = 0;
         if (Math.abs(rotateX) < 0.001) rotateX = 0;
  
          const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  
          $slideEl.transform(slideTransform);
         $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
         if (params.slideShadows) {
           // Set shadows
           let $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
           let $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
           if ($shadowBeforeEl.length === 0) {
             $shadowBeforeEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
             $slideEl.append($shadowBeforeEl);
           }
           if ($shadowAfterEl.length === 0) {
             $shadowAfterEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
             $slideEl.append($shadowAfterEl);
           }
           if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
           if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
         }
       }
  
        // Set correct perspective for IE10
       if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
         const ws = $wrapperEl[0].style;
         ws.perspectiveOrigin = `${center}px 50%`;
       }
     },
     setTransition(duration) {
       const swiper = this;
       swiper.slides
         .transition(duration)
         .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
         .transition(duration);
     }
   }
  }

openModal() {
  this.modalcontroller.create({component: ModalpopupPageModule}).then((modalElement) => {
modalElement.present();
  });
}
//animating cards

// swiperCont = document.getElementsByClassName('swiper-container')
// slideOpts = {
//  slidesPerView: 1,
//  coverflowEffect: {
//    rotate: 50,
//    stretch: 20,
//    depth: 200,
//    modifier: 3,
//    slideShadows: true,
//    initialSlide: 2
//  },
//  on: {
//    beforeInit() {
//      const swiper = this;

//      swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
//      swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

//      swiper.params.watchSlidesProgress = true;
//      swiper.originalParams.watchSlidesProgress = true;
//    },
//    setTranslate() {
//      const swiper = this;
//      const {
//        width: swiperWidth, height: swiperHeight, slides, $wrapperEl, slidesSizesGrid, $
//      } = swiper;
//      const params = swiper.params.coverflowEffect;
//      const isHorizontal = swiper.isHorizontal();
//      const transform$$1 = swiper.translate;
//      const center = isHorizontal ? -transform$$1 + (swiperWidth / 2) : -transform$$1 + (swiperHeight / 2);
//      const rotate = isHorizontal ? params.rotate : -params.rotate;
//      const translate = params.depth;
//      // Each slide offset from center
//      for (let i = 0, length = slides.length; i < length; i += 1) {
//        const $slideEl = slides.eq(i);
//        const slideSize = slidesSizesGrid[i];
//        const slideOffset = $slideEl[0].swiperSlideOffset;
//        const offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

//         let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
//        let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
//        // var rotateZ = 0
//        let translateZ = -translate * Math.abs(offsetMultiplier);

//         let translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
//        let translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;

//         // Fix for ultra small values
//        if (Math.abs(translateX) < 0.001) translateX = 0;
//        if (Math.abs(translateY) < 0.001) translateY = 0;
//        if (Math.abs(translateZ) < 0.001) translateZ = 0;
//        if (Math.abs(rotateY) < 0.001) rotateY = 0;
//        if (Math.abs(rotateX) < 0.001) rotateX = 0;

//         const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

//         $slideEl.transform(slideTransform);
//        $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
//        if (params.slideShadows) {
//          // Set shadows
//          let $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
//          let $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
//          if ($shadowBeforeEl.length === 0) {
//            $shadowBeforeEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
//            $slideEl.append($shadowBeforeEl);
//          }
//          if ($shadowAfterEl.length === 0) {
//            $shadowAfterEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
//            $slideEl.append($shadowAfterEl);
//          }
//          if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
//          if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
//        }
//      }

//       // Set correct perspective for IE10
//      if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
//        const ws = $wrapperEl[0].style;
//        ws.perspectiveOrigin = `${center}px 50%`;
//      }
//    },
//    setTransition(duration) {
//      const swiper = this;
//      swiper.slides
//        .transition(duration)
//        .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
//        .transition(duration);
//    }
//  }
// }
}
