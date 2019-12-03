import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-editprice',
  templateUrl: './editprice.page.html',
  styleUrls: ['./editprice.page.scss'],
})
export class EditpricePage implements OnInit {

  pricess = {
    gl001: null,
    hd001: null,
    pap005: null,
    pap007: null,
    pap001: null,
    pap003: null,
    ld003: null,
    nfalo1: null,
    pet005: null,
    pet003: null,
    pet001: null,
  };

  db = firebase.firestore();
  price = [];
  prices;

  constructor() {
    this.prices = this.db.collection('price').doc("SinUfRNnbB073KZiDIZE");
    this.prices.get().then((documentSnapshot) => {
      this.price = [];
      console.log(documentSnapshot.data());
      this.price.push(documentSnapshot.data());
      console.log(this.price);
      this.pricess.gl001 = documentSnapshot.data().gl001;
      this.pricess.hd001 = documentSnapshot.data().hd001;
      this.pricess.ld003 = documentSnapshot.data().ld003;
      this.pricess.nfalo1 = documentSnapshot.data().nfalo1;
      this.pricess.pap001 = documentSnapshot.data().pap001;
      this.pricess.pap003 =documentSnapshot.data().pap003;
      this.pricess.pap005 = documentSnapshot.data().pap005;
      this.pricess.pet001= documentSnapshot.data().pet001;
     this.pricess.pet003=documentSnapshot.data().pet003;
     this.pricess.pet005=documentSnapshot.data().pet005;
    });
   }

  ngOnInit() {
  }

  //method for animating cards
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
  

  update(pricess){
    console.log(pricess)
    
    // To update age and favorite color:
    this.db.collection("price").doc("SinUfRNnbB073KZiDIZE").update({
      gl001:pricess.gl001,
      hd001:pricess.hd001,
      ld003:pricess.ld003,
      nfalo1:pricess.nfalo1,
      pap005: pricess.pap005,
      pap001:pricess.pap001,
      pap003: pricess.pap003,
      pet001:pricess.pet001,
      pet005:pricess.pet005,
      pet003:pricess.pet003
    })
    .then((data) => {
      console.log("Document successfully updated!");
    });
    }

}
