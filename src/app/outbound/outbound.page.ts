import { log } from 'util';
import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-outbound',
  templateUrl: './outbound.page.html',
  styleUrls: ['./outbound.page.scss'],
})
export class OutboundPage implements OnInit {
  letterObj = {
    to: '',
    from: '',
    text: ''
  };

  // user infor
  admin = [];
  Newadmin = [];

  db = firebase.firestore();

  prices;
  getprice;

  DriverName;
  RegistarionNumberPlates;
  overallStorage;
  TruckSourcess;
  Destination;

  isLabelActive;

  GH001mass;
  NFAL01mass;
  PAP005mass;
  PAP007mass;
  PAP001mass;
  PAP003mass;
  HD001mass;
  LD001mass;
  LD003mass;
  PET001mass;
  PET003mass;
  PET005mass;

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

  pdfObj = null;

  RegisterForm: FormGroup;

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
  };

  constructor(
    private plt: Platform,
    private file: File,
    private fileOpener: FileOpener,
    public route: Router,
    public formGroup: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController
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

    this.RegisterForm = formGroup.group({
        DriverName : ['', [Validators.required, Validators.maxLength(15)]],
        RegistarionNumberPlates : ['', [Validators.required, Validators.maxLength(10)]],
        Destination : ['', [Validators.required, Validators.maxLength(25)]],
      });

    this.getMasses();

    }

  ngOnInit() {
  }

  //active form icons
  toggleIcon(event) {
    this.isLabelActive = !this.isLabelActive;
  }

  getMasses() {
    this.getprice = this.db.collection('storage').onSnapshot(snapshot => {
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
      // console.log(this.GH001storagemass);
      // console.log(this.NFAL01storagemass);
      // console.log(this.PAP005storagemass);
      // console.log(this.PAP007storagemass);
      // console.log(this.PAP001storagemass);
      // console.log(this.PAP003storagemass);
      // console.log(this.HD001storagemass);
      // console.log(this.LD001storagemass);
      // console.log(this.LD003storagemass);
      // console.log(this.PET001storagemass);
      // console.log(this.PET003storagemass);
      // console.log(this.PET005storagemass);
    });
  }

  SaveOutbound() {
    this.db.collection('outbound').doc().set({
      date: new Date(),
      DriverName: this.DriverName,
      RegistarionNumberPlates: this.RegistarionNumberPlates,
      TruckSourcess: this.TruckSourcess,
      Destination: this.Destination,
      GH001: this.GH001mass,
      NFAL01: this.NFAL01mass,
      PAP005: this.PAP005mass,
      PAP007: this.PAP007mass,
      PAP001: this.PAP001mass,
      PAP003: this.PAP003mass,
      HD001: this.HD001mass,
      LD001: this.LD001mass,
      LD003: this.LD003mass,
      PET00: this.PET001mass,
      PET003: this.PET003mass,
      PET005: this.PET005mass,
      ovarallMass: this.overallStorage
    });
  }

  calculateOverall() {
    this.checkinputfields();

    this.overallStorage = this.GH001mass + this.HD001mass + this.LD001mass + this.LD003mass + this.NFAL01mass
     + this.PAP001mass + this.PAP003mass + this.PAP005mass + this.PAP007mass + this.PET001mass +
     this.PET003mass + this.PET005mass;
    console.log(this.overallStorage);

    this.SaveOutbound();
    this.createPdf();
    this.presentAlert();

  }

  checkinputfields() {
    // GH001mass
    if (this.GH001mass === null) {
      this.GH001mass = 0;
    } else if (this.GH001mass === undefined) {
      this.GH001mass = 0;
    }
    // console.log(this.GH001mass);

    // NFAL01mass
    if (this.NFAL01mass === null) {
      this.NFAL01mass = 0;
    }
    if (this.NFAL01mass === undefined) {
      this.NFAL01mass = 0;
    }
    // console.log(this.NFAL01mass);

    // PAP005mass
    if (this.PAP005mass === null) {
      this.PAP005mass = 0;
    }
    if (this.PAP005mass === undefined) {
      this.PAP005mass = 0;
    }
    // console.log(this.PAP005mass);

    // PAP007mass
    if (this.PAP007mass === null) {
      this.PAP007mass = 0;
    }
    if (this.PAP007mass === undefined) {
      this.PAP007mass = 0;
    }
    // console.log(this.PAP007mass);

    // PAP001mass
    if (this.PAP001mass === null) {
      this.PAP001mass = 0;
    }
    if (this.PAP001mass === undefined) {
      this.PAP001mass = 0;
    }
    // console.log(this.PAP001mass);

    // PAP003mass
    if (this.PAP003mass === null) {
      this.PAP003mass = 0;
    }
    if (this.PAP003mass === undefined) {
      this.PAP003mass = 0;
    }
    // console.log(this.PAP003mass);

    // HD001mass
    if (this.HD001mass === null) {
      this.HD001mass = 0;
    }
    if (this.HD001mass === undefined) {
      this.HD001mass = 0;
    }
    // console.log(this.HD001mass);

    // LD001mass
    if (this.LD001mass === null) {
      this.LD001mass = 0;
    }
    if (this.LD001mass === undefined) {
      this.LD001mass = 0;
    }
    // console.log(this.LD001mass);

    // LD003mass
    if (this.LD003mass === null) {
      this.LD003mass = 0;
    }
    if (this.LD003mass === undefined) {
      this.LD003mass = 0;
    }
    // console.log(this.LD003mass);

    // PET001mass
    if (this.PET001mass === null) {
      this.PET001mass = 0;
    }
    if (this.PET001mass === undefined) {
      this.PET001mass = 0;
    }
    // console.log(this.PET001mass);

    // PET003mass
    if (this.PET003mass === null) {
      this.PET003mass = 0;
    }
    if (this.PET003mass === undefined) {
      this.PET003mass = 0;
    }
    // console.log(this.PET003mass);

    // PET005mass
    if (this.PET005mass === null) {
      this.PET005mass = 0;
    }
    if (this.PET005mass === undefined) {
      this.PET005mass = 0;
    }
    // console.log(this.PET005mass);

    this.updateStorage();

  }

  updateStorage() {
    // storageGH001
    this.storageGH001 = this.GH001storagemass - this.GH001mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({GL001: this.storageGH001});
    // console.log('stored to fire', this.storageGH001);
    // console.log('entered mass', this.GH001storagemass);
    // console.log('mass of database', this.GH001mass);

    // storage NFAL01;
    this.storageNFAL01 = this.NFAL01storagemass - this.NFAL01mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({NFAL01: this.storageNFAL01});
    // console.log('stored to fire', this.storageNFAL01);
    // console.log('entered mass', this.NFAL01storagemass);
    // console.log('mass of database', this.NFAL01mass);

    // storage PAP005;
    this.storagePAP005 = this.PAP005storagemass - this.PAP005mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PAP005: this.storagePAP005});
    // console.log('stored to fire', this.storagePAP005);
    // console.log('entered mass', this.PAP005storagemass);
    // console.log('mass of database', this.PAP005mass);

    // storage PAP007;
    this.storagePAP007 = this.PAP007storagemass - this.PAP007mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PAP007: this.storagePAP007});
    // console.log('stored to fire', this.storagePAP007);
    // console.log('entered mass', this.PAP007storagemass);
    // console.log('mass of database', this.PAP007mass);

    // storage PAP001;
    this.storagePAP001 = this.PAP001storagemass - this.PAP001mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PAP001: this.storagePAP001});
    // console.log('stored to fire', this.storagePAP001);
    // console.log('entered mass', this.PAP001storagemass);
    // console.log('mass of database', this.PAP001mass);

    // storage PAP003;
    this.storagePAP003 = this.PAP003storagemass - this.PAP003mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PAP003: this.storagePAP003});
    // console.log('stored to fire', this.storagePAP003);
    // console.log('entered mass', this.PAP003storagemass);
    // console.log('mass of database', this.PAP003mass);

    // storage HD001;
    this.storageHD001 = this.HD001storagemass - this.HD001mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({HD001: this.storageHD001});
    // console.log('stored to fire', this.storageHD001);
    // console.log('entered mass', this.HD001storagemass);
    // console.log('mass of database', this.HD001mass);

    // storage LD001;
    this.storageLD001 = this.LD001storagemass - this.LD001mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({LD001: this.storageLD001});
    // console.log('stored to fire', this.storageLD001);
    // console.log('entered mass', this.LD001storagemass);
    // console.log('mass of database', this.LD001mass);

    // storage LD003;
    this.storageLD003 = this.LD003storagemass - this.LD003mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({LD003: this.storageLD003});
    // console.log('stored to fire', this.storageLD003);
    // console.log('entered mass', this.LD003storagemass);
    // console.log('mass of database', this.LD003mass);

    // storage PET001;
    this.storagePET001 = this.PET001storagemass - this.PET001mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PET001: this.storagePET001});
    // console.log('stored to fire', this.storagePET001);
    // console.log('entered mass', this.PET001storagemass);
    // console.log('mass of database', this.PET001mass);

    // storage PET003;
    this.storagePET003 = this.PET003storagemass - this.PET003mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PET003: this.storagePET003});
    // console.log('stored to fire', this.storagePET003);
    // console.log('entered mass', this.PET003storagemass);
    // console.log('mass of database', this.PET003mass);

    // storage PET005;
    this.storagePET005 = this.PET005storagemass - this.PET005mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PEP005: this.storagePET005});
    // console.log('stored to fire', this.storagePET005);
    // console.log('entered mass', this.PET005storagemass);
    // console.log('mass of database', this.PET005mass);

  }

  // TruckSource(event) {
  //   if (this.TruckSourcess = null) {
  //     this.TruckSourcess = 'Nothing Selected';
  //   } else {
  //     this.TruckSourcess = event.detail.value;
  //   }
  //   console.log(this.TruckSourcess);
  // }

  createPdf() {
    var docDefinition = {
      content: [
        { text: 'Mothombowolwazi', style: 'header' },
        { text: new Date().toTimeString(), alignment: 'right' },
        {
  			  image: 'data:image/png;base64,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',
  			  width: 150
  		  },

        { text: '', style: 'subheader' },
        { text: this.letterObj.from },

        { text: '', style: 'subheader' },
        this.letterObj.to,

        { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },

        {
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            widths: [ 'auto', 'auto', 'auto', 'auto' ],
            body: [
              [ 'NAME', 'SURNAME', 'CONTACT', 'ADDRESS' ],
              [ this.DriverName, this.RegistarionNumberPlates , this.TruckSourcess, this.Destination ],
            ]
          }
        },

        { text: '', style: 'subheader' },
        { text: this.letterObj.from },

        { text: '', style: 'subheader' },
        this.letterObj.to,

        {
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            widths: [ 'auto', 'auto' ],
            body: [
              [ 'CODE ', 'MASS' ],
              [ 'GH001', this.GH001mass ],
              [ 'NFAL01', this.NFAL01mass ],
              [ 'PAP005', this.PAP005mass ],
              [ 'PAP007', this.PAP007mass ],
              [ 'PAP001', this.PAP001mass ],
              [ 'PAP003', this.PAP003mass ],
              [ 'HD001', this.HD001mass ],
              [ 'LD001', this.LD001mass ],
              [ 'LD003', this.LD003mass ],
              [ 'PET001', this.PET001mass ],
              [ 'PET003', this.PET003mass ],
              [ 'PET005', this.PET005mass ],
              [ 'Total Mass', this.overallStorage ],
            ]
          }
        },
      ],

      footer: {
        columns: [
          'Printed Date',
          { text: new Date().toTimeString(), alignment: 'right' }
        ]
      },

      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 13,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    };
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }

  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        });
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }

  Logout() {
    firebase.auth().signOut().then((res) => {
      console.log(res);
      this.route.navigateByUrl('/login');
     });
    }

    async presentAlert() {
      // Perfom PayPal or Stripe checkout process
      let alert = await this.alertController.create({
        header: 'OutBound Information!',
        message: 'OutBound Information saved. check history for records',
        buttons: ['OK']
      });
      alert.present().then(() => {
        this.clearInputs();
        this.route.navigateByUrl('/outbound');
      });
    }

    clearInputs() {
      this.DriverName = '';
      this.RegistarionNumberPlates = '';
      // this.overallStorage = '';
      this.TruckSourcess = '';
      this.Destination = '';
      this.GH001mass = '';
      this.NFAL01mass = '';
      this.PAP005mass = '';
      this.PAP007mass = '';
      this.PAP001mass = '';
      this.PAP003mass = '';
      this.HD001mass = '';
      this.LD001mass = '';
      this.LD003mass = '';
      this.PET001mass = '';
      this.PET003mass = '';
      this.PET005mass = '';
      console.log('inputs cleared');
    }

    async presentAlertCancel() {
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: '<strong>Are you sure you want to erase data? data will not be saved.</strong>!!!',
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
              this.route.navigateByUrl('/outbound');
              console.log('Confirm Okay');
            }
          }
        ]
      });
      await alert.present();
    }

    // async presentAlert(data) { 
    //   const alert = await this.alertController.create({
    //     header: 'Alert',
    //     message: data,
    //     buttons: ['OK']
    //   });
    //   await alert.present();
    // }

    // async presentToast() {
    //   const toast = await this.toastController.create({
    //     message: 'New Transaction Created.',
    //     duration: 9000,
    //     color: 'success',
    //     position: 'middle',
    //     buttons: [
    //       {
    //         side: 'start',
    //         icon: 'home',
    //         text: 'Ok',
    //         handler: () => {
    //           this.route.navigateByUrl('/home');
    //           console.log('Go to Home');
    //         }
    //       }
    //     ]
    //   });
    //   toast.present();
    // }

    async presentLoading() {
      const loading = await this.loadingController.create({
        message: 'Loading',
      });
      await loading.present();
      loading.dismiss();
    }

}
