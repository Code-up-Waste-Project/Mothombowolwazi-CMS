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
  // substrings
  overallMassz;
  OverallSubTotalz;
  OverallVatz;
  OverallGrandTotalz;

  GH001;
  NFAL01;
  PAP005;
  PAP007;
  PAP001;
  PAP001z;
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
  // substrings
  GH001massz;
  NFAL01massz;
  PAP005massz;
  PAP007massz;
  PAP001massz;
  PAP003massz;
  HD001massz;
  LD001massz;
  LD003massz;
  PET001massz;
  PET003massz;
  PET005massz;

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
  // substrings
  GH001pricez;
  NFAL01pricez;
  PAP005pricez;
  PAP007pricez;
  PAP001pricez;
  PAP003pricez;
  HD001pricez;
  LD001pricez;
  LD003pricez;
  PET001pricez;
  PET003pricez;
  PET005pricez;

  // GH001
  GH001SubTotal;
  GH001Vat;
  GH001GrandTotal;
  // substrings
  GH001SubTotalz;
  GH001Vatz;
  GH001GrandTotalz;

  // NFAL01;
  NFAL01SubTotal;
  NFAL01Vat;
  NFAL01GrandTotal;
  // substrings
  NFAL01SubTotalz;
  NFAL01Vatz;
  NFAL01GrandTotalz;

  // PAP005;
  PAP005SubTotal;
  PAP005Vat;
  PAP005GrandTotal;
  // substrings
  PAP005SubTotalz;
  PAP005Vatz;
  PAP005GrandTotalz;

  // PAP007;
  PAP007SubTotal;
  PAP007Vat;
  PAP007GrandTotal;
  // substrings
  PAP007SubTotalz;
  PAP007Vatz;
  PAP007GrandTotalz;

  // PAP001;
  PAP001SubTotal;
  PAP001Vat;
  PAP001GrandTotal;
  // substrings
  PAP001SubTotalz;
  PAP001Vatz;
  PAP001GrandTotalz;

  // PAP003;
  PAP003SubTotal;
  PAP003Vat;
  PAP003GrandTotal;
  // substrings
  PAP003SubTotalz;
  PAP003Vatz;
  PAP003GrandTotalz;

  // HD001;
  HD001SubTotal;
  HD001Vat;
  HD001GrandTotal;
  // substrings
  HD001SubTotalz;
  HD001Vatz;
  HD001GrandTotalz;

  // LD001;
  LD001SubTotal;
  LD001Vat;
  LD001GrandTotal;
  // substrings
  LD001SubTotalz;
  LD001Vatz;
  LD001GrandTotalz;

  // LD003;
  LD003SubTotal;
  LD003Vat;
  LD003GrandTotal;
  // substrings
  LD003SubTotalz;
  LD003Vatz;
  LD003GrandTotalz;

  // PET001;
  PET001SubTotal;
  PET001Vat;
  PET001GrandTotal;
  // substrings
  PET001SubTotalz;
  PET001Vatz;
  PET001GrandTotalz;

  // PET003;
  PET003SubTotal;
  PET003Vat;
  PET003GrandTotal;
  // substrings
  PET003SubTotalz;
  PET003Vatz;
  PET003GrandTotalz;

  // PET005;
  PET005SubTotal;
  PET005Vat;
  PET005GrandTotal;
  // substrings
  PET005SubTotalz;
  PET005Vatz;
  PET005GrandTotalz;

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
          this.overallMassz = (String(overallMass).substring(0, 6));
          OverallSubTotal = this.OverallSubTotal = element.data().OverallSubTotal;
          this.OverallSubTotalz = (String(OverallSubTotal).substring(0, 6));
          OverallVat = this.OverallVat = element.data().OverallVat;
          this.OverallVatz = (String(OverallVat).substring(0, 6));
          OverallGrandTotal = this.OverallGrandTotal = element.data().OverallGrandTotal;
          this.OverallGrandTotalz = (String(OverallGrandTotal).substring(0, 6));
          // console.log(this.overallMass);
          // console.log(this.OverallSubTotal);
          // console.log(this.OverallVat);
          // console.log(this.OverallGrandTotal);
          // console.log(this.overallMassz);
          // console.log(this.OverallSubTotalz);
          // console.log(this.OverallVatz);
          // console.log(this.OverallGrandTotalz);

          // prices
          GH001 = this.GH001 = element.data().GH001;
          NFAL01 = this.NFAL01 = element.data().NFAL01;
          PAP005 = this.PAP005 = element.data().PAP005;
          PAP007 = this.PAP007 = element.data().PAP007;
          PAP001 = this.PAP001 = element.data().PAP001;
          this.PAP001z = (String(PAP001).substring(0, 6));
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
          this.GH001pricez = (String(GH001price).substring(0, 6));
          NFAL01price = this.NFAL01price = element.data().NFAL01Price;
          this.NFAL01pricez = (String(NFAL01price).substring(0, 6));
          PAP005price = this.PAP005price = element.data().PAP005Price;
          this.PAP005pricez = (String(PAP005price).substring(0, 6));
          PAP007price = this.PAP007price = element.data().PAP007Price;
          this.PAP007pricez = (String(PAP007price).substring(0, 6));
          PAP001price = this.PAP001price = element.data().PAP001Price;
          this.PAP001pricez = (String(PAP001price).substring(0, 6));
          PAP003price = this.PAP003price = element.data().PAP003Price;
          this.PAP003pricez = (String(PAP003price).substring(0, 6));
          HD001price = this.HD001price = element.data().HD001Price;
          this.HD001pricez = (String(HD001price).substring(0, 6));
          LD001price = this.LD001price = element.data().LD001Price;
          this.LD001pricez = (String(LD001price).substring(0, 6));
          LD003price = this.LD003price = element.data().LD003Price;
          this.LD003pricez = (String(LD003price).substring(0, 6));
          PET001price = this.PET001price = element.data().PET001Price;
          this.PET001pricez = (String(PET001price).substring(0, 6));
          PET003price = this.PET003price = element.data().PET003Price;
          this.PET003pricez = (String(PET003price).substring(0, 6));
          PET005price = this.PET005price = element.data().PEP005Price;
          this.PET005pricez = (String(PET005price).substring(0, 6));
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
          // console.log(this.GH001pricez);
          // console.log(this.NFAL01pricez);
          // console.log(this.PAP005pricez);
          // console.log(this.PAP007pricez);
          // console.log(this.PAP001pricez);
          // console.log(this.PAP003pricez);
          // console.log(this.HD001pricez);
          // console.log(this.LD001pricez);
          // console.log(this.LD003pricez);
          // console.log(this.PET001pricez);
          // console.log(this.PET003pricez);
          // console.log(this.PET005pricez);

          // tractionsation data
          // GH001
          GH001SubTotal = this.GH001SubTotal = element.data().GH001SubTotal;
          this.GH001SubTotalz = (String(GH001SubTotal).substring(0, 6));
          GH001Vat = this.GH001Vat = element.data().GH001Vat;
          this.GH001Vatz = (String(GH001Vat).substring(0, 6));
          GH001GrandTotal = this.GH001GrandTotal = element.data().GH001;
          this.GH001GrandTotalz = (String(GH001GrandTotal).substring(0, 6));
          // console.log(this.GH001SubTotal);
          // console.log(this.GH001Vat);
          // console.log(this.GH001);
          // console.log(this.GH001SubTotalz);
          // console.log(this.GH001Vatz);
          // console.log(this.GH001GrandTotalz);

          // NFAL01;
          NFAL01SubTotal = this.NFAL01SubTotal = element.data().NFAL01SubTotal;
          this.NFAL01SubTotalz = (String(NFAL01SubTotal).substring(0, 6));
          NFAL01Vat = this.NFAL01Vat = element.data().NFAL01Vat;
          this.NFAL01Vatz = (String(NFAL01Vat).substring(0, 6));
          NFAL01GrandTotal = this.NFAL01GrandTotal = element.data().NFAL01;
          this.NFAL01GrandTotalz = (String(NFAL01GrandTotal).substring(0, 6));
          // console.log(this.NFAL01SubTotal);
          // console.log(this.NFAL01Vat);
          // console.log(this.NFAL01GrandTotal);
          // console.log(this.NFAL01SubTotalz);
          // console.log(this.NFAL01Vatz);
          // console.log(this.NFAL01GrandTotalz);

          // PAP005;
          PAP005SubTotal = this.PAP005SubTotal = element.data().PAP005SubTotal;
          this.PAP005SubTotalz = (String(PAP005SubTotal).substring(0, 6));
          PAP005Vat = this.PAP005Vat = element.data().PAP005Vat;
          this.PAP005Vatz = (String(PAP005Vat).substring(0, 6));
          PAP005GrandTotal = this.PAP005GrandTotal = element.data().PAP005;
          this.PAP005GrandTotalz = (String(PAP005GrandTotal).substring(0, 6));
          // console.log(this.PAP005SubTotal);
          // console.log(this.PAP005Vat);
          // console.log(this.PAP005GrandTotal);
          // console.log(this.PAP005SubTotalz);
          // console.log(this.PAP005Vatz);
          // console.log(this.PAP005GrandTotalz);

          // PAP007;
          PAP007SubTotal = this.PAP007SubTotal = element.data().PAP007SubTotal;
          this.PAP007SubTotalz = (String(PAP007SubTotal).substring(0, 6));
          PAP007Vat = this.PAP007Vat = element.data().PAP007Vat;
          this.PAP007Vatz = (String(PAP007Vat).substring(0, 6));
          PAP007GrandTotal = this.PAP007GrandTotal = element.data().PAP007;
          this.PAP007GrandTotalz = (String(PAP007GrandTotal).substring(0, 6));
          // console.log(this.PAP007SubTotal);
          // console.log(this.PAP007Vat);
          // console.log(this.PAP007GrandTotal);
          // console.log(this.PAP007SubTotalz);
          // console.log(this.PAP007Vatz);
          // console.log(this.PAP007GrandTotalz);

          // PAP001;
          PAP001SubTotal = this.PAP001SubTotal = element.data().PAP001SubTotal;
          this.PAP001SubTotalz = (String(PAP001SubTotal).substring(0, 6));
          PAP001Vat = this.PAP001Vat = element.data().PAP001Vat;
          this.PAP001Vatz = (String(PAP001Vat).substring(0, 6));
          PAP001GrandTotal = this.PAP001GrandTotal = element.data().PAP001;
          this.PAP001GrandTotalz = (String(PAP001GrandTotal).substring(0, 6));
          // console.log(this.PAP001SubTotal);
          // console.log(this.PAP001Vat);
          // console.log(this.PAP001GrandTotal);
          // console.log(this.PAP001SubTotalz);
          // console.log(this.PAP001Vatz);
          // console.log(this.PAP001GrandTotalz);

          // PAP003;
          PAP003SubTotal = this.PAP003SubTotal = element.data().PAP003SubTotal;
          this.PAP003SubTotalz = (String(PAP003SubTotal).substring(0, 6));
          PAP003Vat = this.PAP003Vat = element.data().PAP003Vat;
          this.PAP003Vatz = (String(PAP003Vat).substring(0, 6));
          PAP003GrandTotal = this.PAP003GrandTotal = element.data().PAP003;
          this.PAP003GrandTotalz = (String(PAP003GrandTotal).substring(0, 6));
          // console.log(this.PAP003SubTotal);
          // console.log(this.PAP003Vat);
          // console.log(this.PAP003GrandTotal);
          // console.log(this.PAP003SubTotalz);
          // console.log(this.PAP003Vatz);
          // console.log(this.PAP003GrandTotalz);

          // HD001;
          HD001SubTotal = this.HD001SubTotal = element.data().HD001SubTotal;
          this.HD001SubTotalz = (String(HD001SubTotal).substring(0, 6));
          HD001Vat = this.HD001Vat = element.data().HD001Vat;
          this.HD001Vatz = (String(HD001Vat).substring(0, 6));
          HD001GrandTotal = this.HD001GrandTotal = element.data().HD001;
          this.HD001GrandTotalz = (String(HD001GrandTotal).substring(0, 6));
          // console.log(this.HD001SubTotal);
          // console.log(this.HD001Vat);
          // console.log(this.HD001GrandTotal);
          // console.log(this.HD001SubTotalz);
          // console.log(this.HD001Vatz);
          // console.log(this.HD001GrandTotalz);

          // LD001;
          LD001SubTotal = this.LD001SubTotal = element.data().LD001SubTotal;
          this.LD001SubTotalz = (String(LD001SubTotal).substring(0, 6));
          LD001Vat = this.LD001Vat = element.data().LD001Vat;
          this.LD001Vatz = (String(LD001Vat).substring(0, 6));
          LD001GrandTotal = this.LD001GrandTotal = element.data().LD001;
          this.LD001GrandTotalz = (String(LD001GrandTotal).substring(0, 6));
          // console.log(this.LD001SubTotal);
          // console.log(this.LD001Vat);
          // console.log(this.LD001GrandTotal);
          // console.log(this.LD001SubTotalz);
          // console.log(this.LD001Vatz);
          // console.log(this.LD001GrandTotalz);

          // LD003;
          LD003SubTotal = this.LD003SubTotal = element.data().LD003SubTotal;
          this.LD003SubTotalz = (String(LD003SubTotal).substring(0, 6));
          LD003Vat = this.LD003Vat = element.data().LD003Vat;
          this.LD003Vatz = (String(LD003Vat).substring(0, 6));
          LD003GrandTotal = this.LD003GrandTotal = element.data().LD003;
          this.LD003GrandTotalz = (String(LD003GrandTotal).substring(0, 6));
          // console.log(this.LD003SubTotal);
          // console.log(this.LD003Vat);
          // console.log(this.LD003GrandTotal);
          // console.log(this.LD003SubTotalz);
          // console.log(this.LD003Vatz);
          // console.log(this.LD003GrandTotalz);

          // PET001;
          PET001SubTotal = this.PET001SubTotal = element.data().PET001SubTotal;
          this.PET001SubTotalz = (String(PET001SubTotal).substring(0, 6));
          PET001Vat = this.PET001Vat = element.data().PET001Vat;
          this.PET001Vatz = (String(PET001Vat).substring(0, 6));
          PET001GrandTotal = this.PET001GrandTotal = element.data().PET001;
          this.PET001GrandTotalz = (String(PET001GrandTotal).substring(0, 6));
          // console.log(this.PET001SubTotal);
          // console.log(this.PET001Vat);
          // console.log(this.PET001GrandTotal);
          // console.log(this.PET001SubTotalz);
          // console.log(this.PET001Vatz);
          // console.log(this.PET001GrandTotalz);

          // PET003;
          PET003SubTotal = this.PET003SubTotal = element.data().PET003SubTotal;
          this.PET003SubTotalz = (String(PET003SubTotal).substring(0, 6));
          PET003Vat = this.PET003Vat = element.data().PET003Vat;
          this.PET003Vatz = (String(PET003Vat).substring(0, 6));
          PET003GrandTotal = this.PET003GrandTotal = element.data().PET003;
          this.PET003GrandTotalz = (String(PET003GrandTotal).substring(0, 6));
          // console.log(this.PET003SubTotal);
          // console.log(this.PET003Vat);
          // console.log(this.PET003GrandTotal);
          // console.log(this.PET003SubTotalz);
          // console.log(this.PET003Vatz);
          // console.log(this.PET003GrandTotalz);

          // PET005;
          PET005SubTotal = this.PET005SubTotal = element.data().PEP005SubTotal;
          this.PET005SubTotalz = (String(PET005SubTotal).substring(0, 6));
          PET005Vat = this.PET005Vat = element.data().PEP005Vat;
          this.PET005Vatz = (String(PET005Vat).substring(0, 6));
          PET005GrandTotal = this.PET005GrandTotal = element.data().PEP005;
          this.PET005GrandTotalz = (String(PET005GrandTotal).substring(0, 6));
          // console.log(this.PET005SubTotal);
          // console.log(this.PET005Vat);
          // console.log(this.PET005GrandTotal);
          // console.log(this.PET005SubTotalz);
          // console.log(this.PET005Vatz);
          // console.log(this.PET005GrandTotalz);

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
              widths: [ '25%', '25%', '25%', '25%' ],
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
              widths: [ '16%', '16%', '16%', '16%', '16%', '16%' ],
              body: [
                [ 'GLASS ', 'PRICE INCL', 'MASS', 'SUB Total', 'VAT', 'GRAND TOTAL' ],
                [ 'GH001', this.GH001, this.GH001mass, this.GH001SubTotalz, this.GH001Vatz, this.GH001GrandTotalz ],
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
              widths: [ '16%', '16%', '16%', '16%', '16%', '16%' ],
              body: [
                [ 'NON-FERROUS', 'PRICE INCL', 'MASS', 'SUB Total', 'VAT', 'GRAND TOTAL' ],
                [ 'NFAL01', this.NFAL01, this.NFAL01mass, this.NFAL01SubTotalz , this.NFAL01Vatz, this.NFAL01GrandTotalz ],
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
              widths: [ '16%', '16%', '16%', '16%', '16%', '16%' ],
              body: [
                [ 'PAPER', 'PRICE INCL', 'MASS', 'SUB Total', 'VAT', 'GRAND TOTAL' ],
                [ 'PAP005', this.PAP005, this.PAP005mass, this.PAP005SubTotalz , this.PAP005Vatz, this.PAP005GrandTotalz ],
                [ 'PAP007', this.PAP007, this.PAP007mass, this.PAP007SubTotalz , this.PAP007Vatz, this.PAP007GrandTotalz ],
                [ 'PAP001', this.PAP001z, this.PAP001mass, this.PAP001SubTotalz , this.PAP001Vatz, this.PAP001GrandTotalz ],
                [ 'PAP003', this.PAP003, this.PAP003mass, this.PAP003SubTotalz , this.PAP003Vatz, this.PAP003GrandTotalz ],
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
              widths: [ '16%', '16%', '16%', '16%', '16%', '16%' ],
              body: [
                [ 'PLASTIC', 'PRICE INCL', 'MASS', 'SUB Total', 'VAT', 'GRAND TOTAL' ],
                [ 'HD001', this.HD001, this.HD001mass, this.HD001SubTotalz , this.HD001Vatz, this.HD001GrandTotalz ],
                [ 'LD001', this.LD001, this.LD001mass, this.LD001SubTotalz , this.LD001Vatz, this.LD001GrandTotalz ],
                [ 'LD003', this.LD003, this.LD003mass, this.LD003SubTotalz , this.LD003Vatz, this.LD003GrandTotalz ],
                [ 'PET001', this.PET001, this.PET001mass, this.PET001SubTotalz , this.PET001Vatz, this.PET001GrandTotalz ],
                [ 'PET003', this.PET003, this.PET003mass, this.PET003SubTotalz , this.PET003Vatz, this.PET003GrandTotalz ],
                [ 'PET005', this.PET005, this.PET005mass, this.PET005SubTotalz , this.PET005Vatz, this.PET005GrandTotalz ],
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
                [ '', this.OverallSubTotalz , this.OverallVatz, this.OverallGrandTotalz ],
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
