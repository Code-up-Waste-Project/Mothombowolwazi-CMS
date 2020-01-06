import { Router, ActivatedRoute  } from '@angular/router';
import { ModalController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import * as firebase from 'firebase';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.page.html',
  styleUrls: ['./modalpopup.page.scss'],
})
export class ModalpopupPage implements OnInit {

  db = firebase.firestore();

  dates = new Date();
  id;
  Reclaimer;
  ViewReclaimer = [];
  testArray = [];

  letterObj = {
    to: '',
    from: '',
    text: ''
  };

  pdfObj = null;

  name;
  surname;
  contact;
  address;

  overallMass;
  OverallSubTotal;
  OverallVat;
  OverallGrandTotal;

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

  // Inputs
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

  // GH001
  GH001SubTotal;
  GH001Vat;
  GH001GrandTotal;

  // NFAL01;
  NFAL01SubTotal;
  NFAL01Vat;
  NFAL01GrandTotal;

  // PAP005;
  PAP005SubTotal;
  PAP005Vat;
  PAP005GrandTotal;

  // PAP007;
  PAP007SubTotal;
  PAP007Vat;
  PAP007GrandTotal;

  // PAP001;
  PAP001SubTotal;
  PAP001Vat;
  PAP001GrandTotal;

  // PAP003;
  PAP003SubTotal;
  PAP003Vat;
  PAP003GrandTotal;

  // HD001;
  HD001SubTotal;
  HD001Vat;
  HD001GrandTotal;

  // LD001;
  LD001SubTotal;
  LD001Vat;
  LD001GrandTotal;

  // LD003;
  LD003SubTotal;
  LD003Vat;
  LD003GrandTotal;

  // PET001;
  PET001SubTotal;
  PET001Vat;
  PET001GrandTotal;

  // PET003;
  PET003SubTotal;
  PET003Vat;
  PET003GrandTotal;

  // PET005;
  PET005SubTotal;
  PET005Vat;
  PET005GrandTotal;

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
      this.getReclaimer(this.id);
      // console.log(this.getReclaimer);

      // pulling data from database
      this.db.collection('reclaimers').onSnapshot(snapshot => {
        snapshot.forEach(element => {
          let name = {};
          let surname = {};
          let contact = {};
          let address = {};

          let overallMass = {};
          let OverallSubTotal = {};
          let OverallVat = {};
          let OverallGrandTotal = {};

          let GH001 = {};
          let NFAL01 = {};
          let PAP005 = {};
          let PAP007 = {};
          let PAP001 = {};
          let PAP003 = {};
          let HD001 = {};
          let LD001 = {};
          let LD003 = {};
          let PET001 = {};
          let PET003 = {};
          let PET005 = {};

          let GH001mass = {};
          let NFAL01mass = {};
          let PAP005mass = {};
          let PAP007mass = {};
          let PAP001mass = {};
          let PAP003mass = {};
          let HD001mass = {};
          let LD001mass = {};
          let LD003mass = {};
          let PET001mass = {};
          let PET003mass = {};
          let PET005mass = {};

          // Inputs
          let GH001price = {};
          let NFAL01price = {};
          let PAP005price = {};
          let PAP007price = {};
          let PAP001price = {};
          let PAP003price = {};
          let HD001price = {};
          let LD001price = {};
          let LD003price = {};
          let PET001price = {};
          let PET003price = {};
          let PET005price = {};

          // GH001
          let GH001SubTotal = {};
          let GH001Vat = {};
          let GH001GrandTotal = {};

          // NFAL01;
          let NFAL01SubTotal = {};
          let NFAL01Vat = {};
          let NFAL01GrandTotal = {};

          // PAP005;
          let PAP005SubTotal = {};
          let PAP005Vat = {};
          let PAP005GrandTotal = {};

          // PAP007;
          let PAP007SubTotal = {};
          let PAP007Vat = {};
          let PAP007GrandTotal = {};

          // PAP001;
          let PAP001SubTotal = {};
          let PAP001Vat = {};
          let PAP001GrandTotal = {};

          // PAP003;
          let PAP003SubTotal = {};
          let PAP003Vat = {};
          let PAP003GrandTotal = {};

          // HD001;
          let HD001SubTotal = {};
          let HD001Vat = {};
          let HD001GrandTotal = {};

          // LD001;
          let LD001SubTotal = {};
          let LD001Vat = {};
          let LD001GrandTotal = {};

          // LD003;
          let LD003SubTotal = {};
          let LD003Vat = {};
          let LD003GrandTotal = {};

          // PET001;
          let PET001SubTotal = {};
          let PET001Vat = {};
          let PET001GrandTotal = {};

          // PET003;
          let PET003SubTotal = {};
          let PET003Vat = {};
          let PET003GrandTotal = {};

          // PET005;
          let PET005SubTotal = {};
          let PET005Vat = {};
          let PET005GrandTotal = {};

          // user infor
          name = this.name = element.data().name;
          surname = this.surname = element.data().surname;
          contact = this.contact = element.data().contact;
          address = this.address = element.data().address;
          // console.log(this.name);
          // console.log(this.surname);
          // console.log(this.contact);
          // console.log(this.address);

          // Logistic infor
          overallMass = this.overallMass = element.data().OverallMass;
          OverallSubTotal = this.OverallSubTotal = element.data().OverallSubTotal;
          OverallVat = this.OverallVat = element.data().OverallVat;
          OverallGrandTotal = this.OverallGrandTotal = element.data().OverallGrandTotal;
          // console.log(this.overallMass);
          // console.log(this.OverallSubTotal);
          // console.log(this.OverallVat);
          // console.log(this.OverallGrandTotal);

          // prices
          GH001 = this.GH001 = element.data().GH001;
          NFAL01 = this.NFAL01 = element.data().NFAL01;
          PAP005 = this.PAP005 = element.data().PAP005;
          PAP007 = this.PAP007 = element.data().PAP007;
          PAP001 = this.PAP001 = element.data().PAP001;
          PAP003 = this.PAP003 = element.data().PAP003;
          HD001 = this.HD001 = element.data().HD001;
          LD001 = this.LD001 = element.data().LD001;
          LD003 = this.LD003 = element.data().LD003;
          PET001 = this.PET001 = element.data().PET001;
          PET003 = this.PET003 = element.data().PET003;
          PET005 = this.PET005 = element.data().PEP005;
          // console.log(this.GH001);
          // console.log(this.NFAL01);
          // console.log(this.PAP005);
          // console.log(this.PAP007);
          // console.log(this.PAP001);
          // console.log(this.PAP003);
          // console.log(this.HD001);
          // console.log(this.LD001);
          // console.log(this.LD003);
          // console.log(this.PET001);
          // console.log(this.PET003);
          // console.log(this.PET005);
          // mass
          GH001mass = this.GH001mass = element.data().GH001Mass;
          NFAL01mass = this.NFAL01mass = element.data().NFAL01Mass;
          PAP005mass = this.PAP005mass = element.data().PAP005Mass;
          PAP007mass = this.PAP007mass = element.data().PAP007Mass;
          PAP001mass = this.PAP001mass = element.data().PAP001Mass;
          PAP003mass = this.PAP003mass = element.data().PAP003Mass;
          HD001mass = this.HD001mass = element.data().HD001Mass;
          LD001mass = this.LD001mass = element.data().LD001Mass;
          LD003mass = this.LD003mass = element.data().LD003Mass;
          PET001mass = this.PET001mass = element.data().PET001Mass;
          PET003mass = this.PET003mass = element.data().PET003Mass;
          PET005mass = this.PET005mass = element.data().PEP005Mass;
          // console.log(this.GH001mass);
          // console.log(this.NFAL01mass);
          // console.log(this.PAP005mass);
          // console.log(this.PAP007mass);
          // console.log(this.PAP001mass);
          // console.log(this.PAP003mass);
          // console.log(this.HD001mass);
          // console.log(this.LD001mass);
          // console.log(this.LD003mass);
          // console.log(this.PET001mass);
          // console.log(this.PET003mass);
          // console.log(this.PET005mass);
          // get prices
          GH001price = this.GH001price = element.data().GH001Price;
          NFAL01price = this.NFAL01price = element.data().NFAL01Price;
          PAP005price = this.PAP005price = element.data().PAP005Price;
          PAP007price = this.PAP007price = element.data().PAP007Price;
          PAP001price = this.PAP001price = element.data().PAP001Price;
          PAP003price = this.PAP003price = element.data().PAP003Price;
          HD001price = this.HD001price = element.data().HD001Price;
          LD001price = this.LD001price = element.data().LD001Price;
          LD003price = this.LD003price = element.data().LD003Price;
          PET001price = this.PET001price = element.data().PET001Price;
          PET003price = this.PET003price = element.data().PET003Price;
          PET005price = this.PET005price = element.data().PEP005Price;
          // console.log(this.GH001price);
          // console.log(this.NFAL01price);
          // console.log(this.PAP005price);
          // console.log(this.PAP007price);
          // console.log(this.PAP001price);
          // console.log(this.PAP003price);
          // console.log(this.HD001price);
          // console.log(this.LD001price);
          // console.log(this.LD003price);
          // console.log(this.PET001price);
          // console.log(this.PET003price);
          // console.log(this.PET005price);
          // tractionsation data
          // GH001
          GH001SubTotal = this.GH001SubTotal = element.data().GH001SubTotal;
          GH001Vat = this.GH001Vat = element.data().GH001Vat;
          GH001GrandTotal = this.GH001GrandTotal = element.data().GH001;
          // console.log(this.GH001SubTotal);
          // console.log(this.GH001Vat);
          // console.log(this.GH001);
          // NFAL01;
          NFAL01SubTotal = this.NFAL01SubTotal = element.data().NFAL01SubTotal;
          NFAL01Vat = this.NFAL01Vat = element.data().NFAL01Vat;
          NFAL01GrandTotal = this.NFAL01GrandTotal = element.data().NFAL01;
          // console.log(this.NFAL01SubTotal);
          // console.log(this.NFAL01Vat);
          // console.log(this.NFAL01GrandTotal);
          // PAP005;
          PAP005SubTotal = this.PAP005SubTotal = element.data().PAP005SubTotal;
          PAP005Vat = this.PAP005Vat = element.data().PAP005Vat;
          PAP005GrandTotal = this.PAP005GrandTotal = element.data().PAP005;
          // console.log(this.PAP005SubTotal);
          // console.log(this.PAP005Vat);
          // console.log(this.PAP005GrandTotal);
          // PAP007;
          PAP007SubTotal = this.PAP007SubTotal = element.data().PAP007SubTotal;
          PAP007Vat = this.PAP007Vat = element.data().PAP007Vat;
          PAP007GrandTotal = this.PAP007GrandTotal = element.data().PAP007;
          // console.log(this.PAP007SubTotal);
          // console.log(this.PAP007Vat);
          // console.log(this.PAP007GrandTotal);
          // PAP001;
          PAP001SubTotal = this.PAP001SubTotal = element.data().PAP001SubTotal;
          PAP001Vat = this.PAP001Vat = element.data().PAP001Vat;
          PAP001GrandTotal = this.PAP001GrandTotal = element.data().PAP001;
          // console.log(this.PAP001SubTotal);
          // console.log(this.PAP001Vat);
          // console.log(this.PAP001GrandTotal);
          // PAP003;
          PAP003SubTotal = this.PAP003SubTotal = element.data().PAP003SubTotal;
          PAP003Vat = this.PAP003Vat = element.data().PAP003Vat;
          PAP003GrandTotal = this.PAP003GrandTotal = element.data().PAP003;
          // console.log(this.PAP003SubTotal);
          // console.log(this.PAP003Vat);
          // console.log(this.PAP003GrandTotal);
          // HD001;
          HD001SubTotal = this.HD001SubTotal = element.data().HD001SubTotal;
          HD001Vat = this.HD001Vat = element.data().HD001Vat;
          HD001GrandTotal = this.HD001GrandTotal = element.data().HD001;
          // console.log(this.HD001SubTotal);
          // console.log(this.HD001Vat);
          // console.log(this.HD001GrandTotal);
          // LD001;
          LD001SubTotal = this.LD001SubTotal = element.data().LD001SubTotal;
          LD001Vat = this.LD001Vat = element.data().LD001Vat;
          LD001GrandTotal = this.LD001GrandTotal = element.data().LD001;
          // console.log(this.LD001SubTotal);
          // console.log(this.LD001Vat);
          // console.log(this.LD001GrandTotal);
          // LD003;
          LD003SubTotal = this.LD003SubTotal = element.data().LD003SubTotal;
          LD003Vat = this.LD003Vat = element.data().LD003Vat;
          LD003GrandTotal = this.LD003GrandTotal = element.data().LD003;
          // console.log(this.LD003SubTotal);
          // console.log(this.LD003Vat);
          // console.log(this.LD003GrandTotal);
          // PET001;
          PET001SubTotal = this.PET001SubTotal = element.data().PET001SubTotal;
          PET001Vat = this.PET001Vat = element.data().PET001Vat;
          PET001GrandTotal = this.PET001GrandTotal = element.data().PET001;
          // console.log(this.PET001SubTotal);
          // console.log(this.PET001Vat);
          // console.log(this.PET001GrandTotal);
          // PET003;
          PET003SubTotal = this.PET003SubTotal = element.data().PET003SubTotal;
          PET003Vat = this.PET003Vat = element.data().PET003Vat;
          PET003GrandTotal = this.PET003GrandTotal = element.data().PET003;
          // console.log(this.PET003SubTotal);
          // console.log(this.PET003Vat);
          // console.log(this.PET003GrandTotal);
          // PET005;
          PET005SubTotal = this.PET005SubTotal = element.data().PEP005SubTotal;
          PET005Vat = this.PET005Vat = element.data().PEP005Vat;
          PET005GrandTotal = this.PET005GrandTotal = element.data().PEP005;
          // console.log(this.PET005SubTotal);
          // console.log(this.PET005Vat);
          // console.log(this.PET005GrandTotal);

          this.testArray.push({
            name: name,
            surname: surname,
            contact: contact,
            address: address,
            overallMass: overallMass,
            OverallSubTotal: OverallSubTotal,
            OverallVat: OverallVat,
            OverallGrandTotal: OverallGrandTotal,
            GH001: GH001,
            NFAL01: NFAL01,
            PAP005: PAP005,
            PAP007: PAP007,
            PAP001: PAP001,
            PAP003: PAP003,
            HD001: HD001,
            LD001: LD001,
            LD003: LD003,
            PET001: PET001,
            PET003: PET003,
            PET005: PET005,
            GH001mass: GH001mass,
            NFAL01mass: NFAL01mass,
            PAP005mass: PAP005mass,
            PAP007mass: PAP007mass,
            PAP001mass: PAP001mass,
            PAP003mass: PAP003mass,
            HD001mass: HD001mass,
            LD001mass: LD001mass,
            LD003mass: LD003mass,
            PET001mass: PET001mass,
            PET003mass: PET003mass,
            PET005mass: PET005mass,
            GH001price: GH001price,
            NFAL01price: NFAL01price,
            PAP005price: PAP005price,
            PAP007price: PAP007price,
            PAP001price: PAP001price,
            PAP003price: PAP003price,
            HD001price: HD001price,
            LD001price: LD001price,
            LD003price: LD003price,
            PET001price: PET001price,
            PET003price: PET003price,
            PET005price: PET005price,
            GH001SubTotal: GH001SubTotal,
            GH001Vat: GH001Vat,
            GH001GrandTotal: GH001GrandTotal,
            NFAL01SubTotal: NFAL01SubTotal,
            NFAL01Vat: NFAL01Vat,
            NFAL01GrandTotal: NFAL01GrandTotal,
            PAP005SubTotal: PAP005SubTotal,
            PAP005Vat: PAP005Vat,
            PAP005GrandTotal: PAP005GrandTotal,
            PAP007SubTotal: PAP007SubTotal,
            PAP007Vat: PAP007Vat,
            PAP007GrandTotal: PAP007GrandTotal,
            PAP001SubTotal: PAP001SubTotal,
            PAP001Vat: PAP001Vat,
            PAP001GrandTotal: PAP001GrandTotal,
            PAP003SubTotal: PAP003SubTotal,
            PAP003Vat: PAP003Vat,
            PAP003GrandTotal: PAP003GrandTotal,
            HD001SubTotal: HD001SubTotal,
            HD001Vat: HD001Vat,
            HD001GrandTotal: HD001GrandTotal,
            LD001SubTotal: LD001SubTotal,
            LD001Vat: LD001Vat,
            LD001GrandTotal: LD001GrandTotal,
            LD003SubTotal: LD003SubTotal,
            LD003Vat: LD003Vat,
            LD003GrandTotal: LD003GrandTotal,
            PET001SubTotal: PET001SubTotal,
            PET001Vat: PET001Vat,
            PET001GrandTotal: PET001GrandTotal,
            PET003SubTotal: PET003SubTotal,
            PET003Vat: PET003Vat,
            PET003GrandTotal: PET003GrandTotal,
            PET005SubTotal: PET005SubTotal,
            PET005Vat: PET005Vat,
            PET005GrandTotal: PET005GrandTotal,
          });
          // console.log(this.testArray);
        });

        // create PDF for Download
        this.createPdf();
      });
    }

    ngOnInit() {
    }

    getReclaimer(id) {
      this.Reclaimer = this.db.collection('reclaimers').doc(id);
      this.Reclaimer.get().then((documentSnapshot) => {
        this.ViewReclaimer = [];
        console.log(documentSnapshot.data());
        this.ViewReclaimer.push(documentSnapshot.data());
        console.log(this.ViewReclaimer);
      });
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
              widths: [ '*', 'auto', 100, '*' ],
              body: [
                [ 'NAME', 'SURNAME', 'CONTACT', 'ADDRESS' ],
                [ this.name, this.surname , this.contact, this.address ],
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
              widths: [ 'auto', 'auto', 'auto', 'auto', 'auto', 'auto' ],
              body: [
                [ 'GLASS ', 'PRICE INCL', 'MASS', 'SUB Total', 'VAT', 'GRAND TOTAL' ],
                [ 'GH001', this.GH001, this.GH001mass, this.GH001SubTotal, this.GH001Vat, this.GH001GrandTotal ],
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
              widths: [ 'auto', 'auto', 'auto', 'auto', 'auto', 'auto' ],
              body: [
                [ 'NON-FERROUS', 'PRICE INCL', 'MASS', 'SUB Total', 'VAT', 'GRAND TOTAL' ],
                [ 'NFAL01', this.NFAL01, this.NFAL01mass, this.NFAL01SubTotal , this.NFAL01Vat, this.NFAL01GrandTotal ],
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
              widths: [ 'auto', 'auto', 'auto', 'auto', 'auto', 'auto' ],
              body: [
                [ 'PAPER', 'PRICE INCL', 'MASS', 'SUB Total', 'VAT', 'GRAND TOTAL' ],
                [ 'PAP005', this.PAP005, this.PAP005mass, this.PAP005SubTotal , this.PAP005Vat, this.PAP005GrandTotal ],
                [ 'PAP007', this.PAP007, this.PAP007mass, this.PAP007SubTotal , this.PAP007Vat, this.PAP007GrandTotal ],
                [ 'PAP001', this.PAP001, this.PAP001mass, this.PAP001SubTotal , this.PAP001Vat, this.PAP001GrandTotal ],
                [ 'PAP003', this.PAP003, this.PAP003mass, this.PAP003SubTotal , this.PAP003Vat, this.PAP003GrandTotal ],
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
              widths: [ 'auto', 'auto', 'auto', 'auto', 'auto', 'auto' ],
              body: [
                [ 'PLASTIC', 'PRICE INCL', 'MASS', 'SUB Total', 'VAT', 'GRAND TOTAL' ],
                [ 'HD001', this.HD001, this.HD001mass, this.HD001SubTotal , this.HD001Vat, this.HD001GrandTotal ],
                [ 'LD001', this.LD001, this.LD001mass, this.LD001SubTotal , this.LD001Vat, this.LD001GrandTotal ],
                [ 'LD003', this.LD003, this.LD003mass, this.LD003SubTotal , this.LD003Vat, this.LD003GrandTotal ],
                [ 'PET001', this.PET001, this.PET001mass, this.PET001SubTotal , this.PET001Vat, this.PET001GrandTotal ],
                [ 'PET003', this.PET003, this.PET003mass, this.PET003SubTotal , this.PET003Vat, this.PET003GrandTotal ],
                [ 'PET005', this.PET005, this.PET005mass, this.PET005SubTotal , this.PET005Vat, this.PET005GrandTotal ],
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
              widths: [ '*', 'auto', 100, '*' ],
              body: [
                [ 'OVERALL PRICE', 'OVERALL SUB-TOTAL', 'OVERALL VAT', 'OVERALL GRAND-TOTAL' ],
                [ '', this.OverallSubTotal , this.OverallVat, this.OverallGrandTotal ],
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
