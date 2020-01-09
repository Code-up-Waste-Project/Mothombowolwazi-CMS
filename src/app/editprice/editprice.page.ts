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

  GH001price;
  NFAL01price;
  PAP005price;
  PAP007price;
  PAP001price;
  PAP003price;
  HD001price;
  LD001price;
  LD003price;
  PET001price;
  PET003price;
  PET005price;

  pricess = {
    gl001: null ,
    hd001: null,
    pap005: null,
    pap007: null,
    pap001: null,
    pap003: null,
    ld003: null,
    ld001: null,
    nfalo1: null,
    pet005: null,
    pet003: null,
    pet001: null,
  };

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

  ionViewWillEnter() {
    this.prices = this.db.collection('price').doc("SinUfRNnbB073KZiDIZE");
    this.prices.get().then((documentSnapshot) => {
      this.price = [];
      console.log(documentSnapshot.data());
      this.price.push(documentSnapshot.data());
      console.log('prices', this.price);
    });
   }

   checkinputfields() {
    // GH001price;
    if (this.GH001price === null) {
      this.GH001price = this.pricess.gl001;
    } else if (this.GH001price === undefined) {
      this.GH001price = this.pricess.gl001;
    }
    console.log(this.GH001price);

    // NFAL01price;
    if (this.NFAL01price === null) {
      this.NFAL01price = this.pricess.nfalo1;
    } else if (this.NFAL01price === undefined) {
      this.NFAL01price = this.pricess.nfalo1;
    }
    console.log(this.NFAL01price);

    // PAP005price;
    if (this.PAP005price === null) {
      this.PAP005price = this.pricess.pap005;
    } else if (this.PAP005price === undefined) {
      this.PAP005price = this.pricess.pap005;
    }
    console.log(this.PAP005price);

    // PAP007price;
    if (this.PAP007price === null) {
      this.PAP007price = this.pricess.pap007;
    } else if (this.PAP007price === undefined) {
      this.PAP007price = this.pricess.pap007;
    }
    console.log(this.PAP007price);

    // PAP001price;
    if (this.PAP001price === null) {
      this.PAP001price = this.pricess.pap001;
    } else if (this.PAP001price === undefined) {
      this.PAP001price = this.pricess.pap001;
    }
    console.log(this.PAP001price);

    // PAP003price;
    if (this.PAP003price === null) {
      this.PAP003price = this.pricess.pap003;
    } else if (this.PAP003price === undefined) {
      this.PAP003price = this.pricess.pap003;
    }
    console.log(this.PAP003price);

    // HD001price;
    if (this.HD001price === null) {
      this.HD001price = this.pricess.hd001;
    } else if (this.HD001price === undefined) {
      this.HD001price = this.pricess.hd001;
    }
    console.log(this.HD001price);

    // LD001price;
    if (this.LD001price === null) {
      this.LD001price = this.pricess.ld001;
    } else if (this.LD001price === undefined) {
      this.LD001price = this.pricess.ld001;
    }
    console.log(this.LD001price);

    // LD003price;
    if (this.LD003price === null) {
      this.LD003price = this.pricess.ld003;
    } else if (this.LD003price === undefined) {
      this.LD003price = this.pricess.ld003;
    }
    console.log(this.LD003price);

    // PET001price;
    if (this.PET001price === null) {
      this.PET001price = this.pricess.pet001;
    } else if (this.PET001price === undefined) {
      this.PET001price = this.pricess.pet001;
    }
    console.log(this.PET001price);

    // PET003price;
    if (this.PET003price === null) {
      this.PET003price = this.pricess.pet003;
    } else if (this.PET003price === undefined) {
      this.PET003price = this.pricess.pet003;
    }
    console.log(this.PET003price);

    // PET005price;
    if (this.PET005price === null) {
      this.PET005price = this.pricess.pet005;
    } else if (this.PET005price === undefined) {
      this.PET005price = this.pricess.pet005;
    }
    console.log(this.PET005price);

    this.presentAlertupdate();

  }

  update() {
    // To update price :
    this.db.collection("price").doc("SinUfRNnbB073KZiDIZE").update({
      gl001: this.GH001price,
      nfalo1: this.NFAL01price,
      pap005: this.PAP005price,
      pap007: this.PAP007price,
      pap001: this.PAP001price,
      pap003: this.PAP003price,
      hd001: this.HD001price,
      ld001: this.LD001price,
      ld003: this.LD003price,
      pet001: this.PET001price,
      pet003: this.PET003price,
      pet005: this.PET005price,
    })
    .then((data) => {
      console.log("Document successfully updated!");
    });
    }

    async presentAlertupdate() {
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: '<strong>Are you sure you want to update Prices?.</strong>!!!',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Okay',
            handler: () => {
              this.update();
              this.clearInputs();
              this.route.navigateByUrl('/editprice');
              console.log('Confirm Okay');
            }
          }
        ]
      });
      await alert.present();
    }

    clearInputs() {
      this.GH001price = '';
      this.NFAL01price = '';
      this.PAP005price = '';
      this.PAP007price = '';
      this.PAP001price = '';
      this.PAP003price = '';
      this.HD001price = '';
      this.LD001price = '';
      this.LD003price = '';
      this.PET001price = '';
      this.PET003price = '';
      this.PET005price = '';
    }

    async presentAlertupdatedelete() {
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: '<strong>Are you sure you want to Cancel, Data will not be saved.</strong>!!!',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Okay',
            handler: () => {
              this.clearInputs();
              this.route.navigateByUrl('/editprice');
              console.log('Confirm Okay');
            }
          }
        ]
      });
      await alert.present();
    }

    Logout() {
      firebase.auth().signOut().then((res) => {
        console.log(res);
        this.route.navigateByUrl('/login');
       });
      }

}
