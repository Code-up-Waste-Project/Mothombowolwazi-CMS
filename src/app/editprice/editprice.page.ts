import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editprice',
  templateUrl: './editprice.page.html',
  styleUrls: ['./editprice.page.scss'],
})
export class EditpricePage implements OnInit {

  // user infor
  admin = [];
  Newadmin = [];

  GH001price: number = 0;
  NFAL01price: number = 0;
  PAP005price: number = 0;
  PAP007price: number = 0;
  PAP001price: number = 0;
  PAP003price: number = 0;
  HD001price: number = 0;
  LD001price: number = 0;
  LD003price: number = 0;
  PET001price: number = 0;
  PET003price: number = 0;
  PET005price: number = 0;

  pricess = {
    gl001: 0,
    hd001: 0,
    pap005: 0,
    pap007: 0,
    pap001: 0,
    pap003: 0,
    ld003: 0,
    ld001: 0,
    nfalo1: 0,
    pet005: 0,
    pet003: 0,
    pet001: 0,
  };

  ;

  db = firebase.firestore();
  price = [];
  prices;

   //method for animating cards
   swiperCont = document.getElementsByClassName('swiper-container');
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
   };

  constructor(
    public loadingController: LoadingController,
    public toastController: ToastController,
    public route: Router,
    public alertController: AlertController,
  ) {
    // pulling for admin
    this.db.collection('admin').onSnapshot(snapshot => {
      // this.Newadmin = [];
      snapshot.forEach(Element => {
        this.admin.push(Element.data());
      });
      this.admin.forEach(item => {
        if (item.userid === firebase.auth().currentUser.uid) {
          this.Newadmin.push(item);
        }
      });
      console.log('Newadmins', this.Newadmin);
    });
   }

  ngOnInit() {
    this.prices = this.db.collection('price').doc("SinUfRNnbB073KZiDIZE");
    this.prices.get().then((documentSnapshot) => {
      this.price = [];
      console.log(documentSnapshot.data());
      this.price.push(documentSnapshot.data());
      console.log(this.price);
      this.pricess.gl001 = documentSnapshot.data().gl001;
      this.pricess.hd001 = documentSnapshot.data().hd001;
      this.pricess.ld001 = documentSnapshot.data().ld001;
      this.pricess.ld003 = documentSnapshot.data().ld003;
      this.pricess.nfalo1 = documentSnapshot.data().nfalo1;
      this.pricess.pap001 = documentSnapshot.data().pap001;
      this.pricess.pap003 = documentSnapshot.data().pap003;
      this.pricess.pap005 = documentSnapshot.data().pap005;
      this.pricess.pap007 = documentSnapshot.data().pap007;
      this.pricess.pet001 = documentSnapshot.data().pet001;
      this.pricess.pet003 = documentSnapshot.data().pet003;
      this.pricess.pet005 = documentSnapshot.data().pet005;
    });
    // console.log(this.pricess.gl001);
    // console.log(this.pricess.hd001);
    // console.log(this.pricess.ld001);
    // console.log(this.pricess.ld003);
    // console.log(this.pricess.nfalo1);
    // console.log(this.pricess.pap001);
    // console.log(this.pricess.pap003);
    // console.log(this.pricess.pap005);
    // console.log(this.pricess.pap007);
    // console.log(this.pricess.pet001);
    // console.log(this.pricess.pet003);
    // console.log(this.pricess.pet005);
  }

  update(pricess) {
    console.log(pricess);

    // To update price :
    this.db.collection("price").doc("SinUfRNnbB073KZiDIZE").update({
      gl001: pricess.gl001,
      hd001: pricess.hd001,
      ld003: pricess.ld003,
      nfalo1: pricess.nfalo1,
      pap005: pricess.pap005,
      pap001: pricess.pap001,
      pap003: pricess.pap003,
      pet001: pricess.pet001,
      pet005: pricess.pet005,
      pet003: pricess.pet003
    })
    .then((data) => {
      console.log("Document successfully updated!");
      this.presentToast();
      this.route.navigate(['/home']);
    });
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
        message: 'Price list updated.',
        duration: 9000,
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

    Logout() {
      firebase.auth().signOut().then((res) => {
        console.log(res);
        this.route.navigateByUrl('/login');
       });
      }

}
