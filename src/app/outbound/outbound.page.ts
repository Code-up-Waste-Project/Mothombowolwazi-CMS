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
