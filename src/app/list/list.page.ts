import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { ModalController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { SelectMultipleControlValueAccessor, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  db = firebase.firestore();

  dates = new Date();
  id;
  Outbound;
  ViewOutbound = [];
  testArray = [];

  letterObj = {
    to: '',
    from: '',
    text: ''
  };

  pdfObj = null;

  DriverName;
  RegistarionNumberPlates;
  overallStorage;
  overallStoragez;
  TruckSourcess;
  Destination;

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
  // substrings
  GH001storagemassz;
  NFAL01storagemassz;
  PAP005storagemassz;
  PAP007storagemassz;
  PAP001storagemassz;
  PAP003storagemassz;
  HD001storagemassz;
  LD001storagemassz;
  LD003storagemassz;
  PET001storagemassz;
  PET003storagemassz;
  PET005storagemassz;

  GH001 = 'GH001';
  NFAL01 = 'NFAL01';
  PAP005 = 'PAP005';
  PAP007 = 'PAP007';
  PAP001 = 'PAP001';
  PAP003 = 'PAP003';
  HD001 = 'HD001';
  LD001 = 'LD001';
  LD003 = 'LD003';
  PET001 = 'PET001';
  PET003 = 'PET003';
  PET005 = 'PET005';
  Mass = 'MASS';

  constructor(
    public toastController: ToastController,
    private modalcontroller: ModalController,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public activatedRoute: ActivatedRoute,
    public menuCtrl: MenuController,
    private content: ElementRef,
    public rendered: Renderer2,
    private plt: Platform,
    private file: File,
    private fileOpener: FileOpener
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    this.getOutBound(this.id);
      // console.log(this.getOutBound);

    this.db.collection('outbound').onSnapshot(snapshot => {
      snapshot.forEach(element => {
        let DriverName = {};
        let RegistarionNumberPlates = {};
        let overallStorage = {};
        let TruckSourcess = {};
        let Destination = {};

        let GH001storagemass = {};
        let NFAL01storagemass = {};
        let PAP005storagemass = {};
        let PAP007storagemass = {};
        let PAP001storagemass = {};
        let PAP003storagemass = {};
        let HD001storagemass = {};
        let LD001storagemass = {};
        let LD003storagemass = {};
        let PET001storagemass = {};
        let PET003storagemass = {};
        let PET005storagemass = {};

        DriverName = this.DriverName = element.data().DriverName;
        RegistarionNumberPlates = this.RegistarionNumberPlates = element.data().RegistarionNumberPlates;
        overallStorage = this.overallStorage = element.data().ovarallMass;
        this.overallStoragez = (String(overallStorage).substring(0, 6));
        TruckSourcess = this.TruckSourcess = element.data().TruckSourcess;
        Destination = this.Destination = element.data().Destination;
        // console.log(this.DriverName);
        // console.log(this.RegistarionNumberPlates);
        // console.log(this.overallStorage);
        // console.log(this.TruckSourcess);
        // console.log(this.Destination);
        // console.log(this.overallStoragez);

        GH001storagemass = this.GH001storagemass = element.data().GH001;
        this.GH001storagemassz = (String(GH001storagemass).substring(0, 6));
        NFAL01storagemass = this.NFAL01storagemass = element.data().NFAL01;
        this.NFAL01storagemassz = (String(NFAL01storagemass).substring(0, 6));
        PAP005storagemass = this.PAP005storagemass = element.data().PAP005;
        this.PAP005storagemassz = (String(PAP005storagemass).substring(0, 6));
        PAP007storagemass = this.PAP007storagemass = element.data().PAP007;
        this.PAP007storagemassz = (String(PAP007storagemass).substring(0, 6));
        PAP001storagemass = this.PAP001storagemass = element.data().PAP001;
        this.PAP001storagemassz = (String(PAP001storagemass).substring(0, 6));
        PAP003storagemass = this.PAP003storagemass = element.data().PAP003;
        this.PAP003storagemassz = (String(PAP003storagemass).substring(0, 6));
        HD001storagemass = this.HD001storagemass = element.data().HD001;
        this.HD001storagemassz = (String(HD001storagemass).substring(0, 6));
        LD001storagemass = this.LD001storagemass = element.data().LD001;
        this.LD001storagemassz = (String(LD001storagemass).substring(0, 6));
        LD003storagemass = this.LD003storagemass = element.data().LD003;
        this.LD003storagemassz = (String(LD003storagemass).substring(0, 6));
        PET001storagemass = this.PET001storagemass = element.data().PET00;
        this.PET001storagemassz = (String(PET001storagemass).substring(0, 6));
        PET003storagemass = this.PET003storagemass = element.data().PET003;
        this.PET003storagemassz = (String(PET003storagemass).substring(0, 6));
        PET005storagemass = this.PET005storagemass = element.data().PET005;
        this.PET005storagemassz = (String(PET005storagemass).substring(0, 6));
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
        // console.log(this.GH001storagemassz);
        // console.log(this.NFAL01storagemassz);
        // console.log(this.PAP005storagemassz);
        // console.log(this.PAP007storagemassz);
        // console.log(this.PAP001storagemassz);
        // console.log(this.PAP003storagemassz);
        // console.log(this.HD001storagemassz);
        // console.log(this.LD001storagemassz);
        // console.log(this.LD003storagemassz);
        // console.log(this.PET001storagemassz);
        // console.log(this.PET003storagemassz);
        // console.log(this.PET005storagemassz);

        this.testArray.push({
          DriverName: this.DriverName,
          RegistarionNumberPlates: this.RegistarionNumberPlates,
          overallStorage: this.overallStorage,
          TruckSourcess: this.TruckSourcess,
          Destination: this.Destination,
          GH001storagemass: this.GH001storagemassz,
          NFAL01storagemass: this.NFAL01storagemassz,
          PAP005storagemass: this.PAP005storagemassz,
          PAP007storagemass: this.PAP007storagemassz,
          PAP001storagemass: this.PAP001storagemassz,
          PAP003storagemass: this.PAP003storagemassz,
          HD001storagemass: this.HD001storagemassz,
          LD001storagemass: this.LD001storagemassz,
          LD003storagemass: this.LD003storagemassz,
          PET001storagemass: this.PET001storagemassz,
          PET003storagemass: this.PET003storagemassz,
          PET005storagemass: this.PET005storagemassz,
        });
        // console.log(this.testArray);
      });
      // create PDF
      this.createPdf();
    });

  }

  ngOnInit() {
  }

  getOutBound(id) {
    this.Outbound = this.db.collection('outbound').doc(id);
    this.Outbound.get().then((documentSnapshot) => {
      this.ViewOutbound = [];
      console.log(documentSnapshot.data());
      this.ViewOutbound.push(documentSnapshot.data());
      // console.log(this.ViewOutbound);
    });
  }

  CloseModal() {
  this.modalcontroller.dismiss();
  }

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
            widths: [ '25%', '25%', '25%', '25%' ],
            body: [
              [ 'Drive Name', 'Registarion Number Plates', 'Truck Source', 'Destination'],
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
              [ this.GH001, this.GH001storagemassz ],
              [ this.NFAL01, this.NFAL01storagemassz ],
              [ this.PAP005, this.PAP005storagemassz ],
              [ this.PAP007, this.PAP007storagemassz ],
              [ this.PAP001, this.PAP001storagemassz ],
              [ this.PAP003, this.PAP003storagemassz ],
              [ this.HD001, this.HD001storagemassz ],
              [ this.LD001, this.LD001storagemassz ],
              [ this.LD003, this.LD003storagemassz ],
              [ this.PET001, this.PET001storagemassz ],
              [ this.PET003, this.PET003storagemassz ],
              [ this.PET005, this.PET005storagemassz ],
              [ this.Mass, this.overallStorage ],
            //   console.log(this.GH001storagemassz),
            //   console.log(this.NFAL01storagemassz),
            //   console.log(this.PAP005storagemassz),
            //   console.log(this.PAP007storagemassz),
            //   console.log(this.PAP001storagemassz),
            //   console.log(this.PAP003storagemassz),
            //   console.log(this.HD001storagemassz),
            //   console.log(this.LD001storagemassz),
            //   console.log(this.LD003storagemassz),
            //   console.log(this.PET001storagemassz),
            //   console.log(this.PET003storagemassz),
            //   console.log(this.PET005storagemassz),
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

}
