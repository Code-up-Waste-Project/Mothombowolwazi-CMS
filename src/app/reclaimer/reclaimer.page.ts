import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { ModalpopupPage } from './../modalpopup/modalpopup.page';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {ModalController} from '@ionic/angular';
// import { read } from 'fs';


@Component({
  selector: 'app-reclaimer',
  templateUrl: './reclaimer.page.html',
  styleUrls: ['./reclaimer.page.scss'],
})
export class ReclaimerPage implements OnInit {
  
  db = firebase.firestore();

  name;
  surname;
  contact;
  address;

  prices;
  getprice;

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

  GH001mass: number = 0;
  NFAL01mass: number = 0;
  PAP005mass: number = 0;
  PAP007mass: number = 0;
  PAP001mass: number = 0;
  PAP003mass: number = 0;
  HD001mass: number = 0;
  LD001mass: number = 0;
  LD003mass: number = 0;
  PET001mass: number = 0;
  PET003mass: number = 0;
  PET005mass: number = 0;

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

  // Totals
  GH001Total;
  NFAL01Total;
  PaperTotal;
  PlasticTotals;
  TotalTotal;

  RegisterForm: FormGroup;

  constructor(
    private modalcontroller: ModalController,
    public route: Router,
    public formGroup: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    private content: ElementRef,
    public rendered: Renderer2
    ) {
    this.getprices();
    this.getMasses();

    this.RegisterForm = formGroup.group({
      name : ['', [Validators.required, Validators.pattern('[a-zA-Z]+$')]],
      surname : ['', [Validators.required, Validators.pattern('[a-zA-Z]+$')]],
      contact : ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address : ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  //   GH001;
  onChangeGH001(data): void {
    console.log(this.GH001mass);
    console.log(data);

    this.GH001GrandTotal = +this.GH001mass * +this.GH001;
    console.log(this.GH001GrandTotal);

    this.GH001price = +this.GH001mass * +this.GH001;
    console.log(this.GH001price);
  }

  //   GH001 Total;
  onChangeTotalGH001(): void {
    this.GH001Total = this.GH001price;
    console.log(this.GH001Total);
  }

  //   NFAL01;
  onChangeNFAL01(data): void {
    console.log(this.NFAL01mass);
    console.log(data);

    this.NFAL01GrandTotal = +this.NFAL01mass * +this.NFAL01;
    console.log(this.NFAL01GrandTotal);

    this.NFAL01price = +this.NFAL01mass * +this.NFAL01;
    console.log(this.NFAL01price);
  }

  //   NFAL01 Total NFAL01Total
  onChangeTotalNFAL01(): void {
    this.NFAL01Total = this.NFAL01price;
    console.log(this.NFAL01Total);
  }

  //   PAP005;
  onChangePAP005(data): void {
    console.log(this.PAP005mass);
    console.log(data);

    this.PAP005GrandTotal = +this.PAP005mass * +this.PAP005;
    console.log(this.PAP005GrandTotal);

    this.PAP005price = +this.PAP005mass * +this.PAP005;
    console.log(this.PAP005price);
  }

  //   PAP007;
  onChangePAP007(data): void {
    console.log(this.PAP007mass);
    console.log(data);

    this.PAP007GrandTotal = +this.PAP007mass * +this.PAP007;
    console.log(this.PAP007GrandTotal);

    this.PAP007price = +this.PAP007mass * +this.PAP007;
    console.log(this.PAP007price);
  }

  //   PAP001;
  onChangePAP001(data): void {
    console.log(this.PAP001mass);
    console.log(data);

    this.PAP001GrandTotal = +this.PAP001mass * +this.PAP001;
    console.log(this.PAP001GrandTotal);

    this.PAP001price = +this.PAP001mass * +this.PAP001;
    console.log(this.PAP001price);
  }

  //   PAP003;
  onChangePAP003(data): void {
    console.log(this.PAP003mass);
    console.log(data);

    this.PAP003GrandTotal = +this.PAP003mass * +this.PAP003;
    console.log(this.PAP003GrandTotal);

    this.PAP003price = +this.PAP003mass * +this.PAP003;
    console.log(this.PAP003price);
  }

  //   Paper Total;
  onChangeTotal(): void {
    this.PaperTotal = +this.PAP001price + +this.PAP007price + +this.PAP001price + +this.PAP003price;
    console.log(this.PaperTotal);
  }

  //   HD001;
  onChangeHD001(data): void {
    console.log(this.HD001mass);
    console.log(data);

    this.HD001GrandTotal = +this.HD001mass * +this.HD001;
    console.log(this.HD001GrandTotal);

    this.HD001price = +this.HD001mass * +this.HD001;
    console.log(this.HD001price);
  }

  //   LD001;
  onChangeLD001(data): void {
    console.log(this.LD001mass);
    console.log(data);

    this.LD001GrandTotal = +this.LD001mass * +this.LD001;
    console.log(this.LD001GrandTotal);

    this.LD001price = +this.LD001mass * +this.LD001;
    console.log(this.LD001price);
  }

  //   LD003;
  onChangeLD003(data): void {
    console.log(this.LD003mass);
    console.log(data);

    this.LD003GrandTotal = +this.LD003mass * +this.LD003;
    console.log(this.LD003GrandTotal);

    this.LD003price = +this.LD003mass * +this.LD003;
    console.log(this.LD003price);
  }

  //   PET001;
  onChangePET001(data): void {
    console.log(this.PET001mass);
    console.log(data);

    this.PET001GrandTotal = +this.PET001mass * +this.PET001;
    console.log(this.PET001GrandTotal);

    this.PET001price = +this.PET001mass * +this.PET001;
    console.log(this.PET001price);
  }

  //   PET003;
  onChangePET003(data): void {
    console.log(this.PET003mass);
    console.log(data);

    this.PET003GrandTotal = +this.PET003mass * +this.PET003;
    console.log(this.PET003GrandTotal);

    this.PET003price = +this.PET003mass * +this.PET003;
    console.log(this.PET003price);
  }

  //   PET005;
  onChangePET005(data): void {
    console.log(this.PET005mass);
    console.log(data);

    this.PET005GrandTotal = +this.PET005mass * +this.PET005;
    console.log(this.PET005GrandTotal);

    this.PET005price = +this.PET005mass * +this.PET005;
    console.log(this.PET005price);
  }

  //   Plastic Total;
  onChangePlasticTotalzzz(): void {
    if (this.HD001price == "") {
      this.PlasticTotals = +this.LD001price + +this.LD003price + +this.PET001price + +this.PET003price + +this.PET005price;
    console.log(this.PlasticTotals);
    } else {
    this.PlasticTotals = +this.HD001price + +this.LD001price + +this.LD003price + +this.PET001price + +this.PET003price + +this.PET005price;
    console.log(this.PlasticTotals);
    }
  }

  TotalTotals() {
    this.TotalTotals = this.PlasticTotals;
  }

  calculate() {
    // GH001
    this.GH001GrandTotal = +this.GH001mass * +this.GH001;
    this.GH001Vat = +this.GH001GrandTotal / 1.15;
    this.GH001SubTotal = +this.GH001GrandTotal - +this.GH001Vat;
    console.log(this.GH001GrandTotal);
    console.log(this.GH001Vat);
    console.log(this.GH001SubTotal);

    // NFAL01
    this.NFAL01GrandTotal = +this.NFAL01mass * +this.NFAL01;
    this.NFAL01Vat = +this.NFAL01GrandTotal / 1.15;
    this.NFAL01SubTotal = +this.NFAL01GrandTotal - +this.NFAL01Vat;
    console.log(this.NFAL01GrandTotal);
    console.log(this.NFAL01Vat);
    console.log(this.NFAL01SubTotal);

    //   PAP005;
    this.PAP005GrandTotal = +this.PAP005mass * +this.PAP005;
    this.PAP005Vat = +this.PAP005GrandTotal / 1.15;
    this.PAP005SubTotal = +this.PAP005GrandTotal - +this.PAP005Vat;
    console.log(this.PAP005GrandTotal);
    console.log(this.PAP005Vat);
    console.log(this.PAP005SubTotal);

    // PAP007
    this.PAP007GrandTotal = +this.PAP007mass * +this.PAP007;
    this.PAP007Vat = +this.PAP007GrandTotal / 1.15;
    this.PAP007SubTotal = +this.PAP007GrandTotal - +this.PAP007Vat;
    console.log(this.PAP007GrandTotal);
    console.log(this.PAP007Vat);
    console.log(this.PAP007SubTotal);

    // PAP001
    this.PAP001GrandTotal = +this.PAP001mass * +this.PAP001;
    this.PAP001Vat = +this.PAP001GrandTotal / 1.15;
    this.PAP001SubTotal = +this.PAP001GrandTotal - +this.PAP001Vat;
    console.log(this.PAP001GrandTotal);
    console.log(this.PAP001Vat);
    console.log(this.PAP001SubTotal);

    // PAP003
    this.PAP003GrandTotal = +this.PAP003mass * +this.PAP003;
    this.PAP003Vat = +this.PAP003GrandTotal / 1.15;
    this.PAP003SubTotal = +this.PAP003GrandTotal - +this.PAP003Vat;
    console.log(this.PAP003GrandTotal);
    console.log(this.PAP003Vat);
    console.log(this.PAP003SubTotal);

    // HD001
    this.HD001GrandTotal = +this.HD001mass * +this.HD001;
    this.HD001Vat = +this.HD001GrandTotal / 1.15;
    this.HD001SubTotal = +this.HD001GrandTotal - +this.HD001Vat;
    console.log(this.HD001GrandTotal);
    console.log(this.HD001Vat);
    console.log(this.HD001SubTotal);

    // LD001
    this.LD001GrandTotal = +this.LD001mass * +this.LD001;
    this.LD001Vat = +this.LD001GrandTotal / 1.15;
    this.LD001SubTotal = +this.LD001GrandTotal - +this.LD001Vat;
    console.log(this.LD001GrandTotal);
    console.log(this.LD001Vat);
    console.log(this.LD001SubTotal);

    // LD003
    this.LD003GrandTotal = +this.LD003mass * +this.LD003;
    this.LD003Vat = +this.LD003GrandTotal / 1.15;
    this.LD003SubTotal = +this.LD003GrandTotal - +this.LD003Vat;
    console.log(this.LD003GrandTotal);
    console.log(this.LD003Vat);
    console.log(this.LD003SubTotal);

    // PET005
    this.PET005GrandTotal = +this.PET005mass * +this.PET005;
    this.PET005Vat = +this.PET005GrandTotal / 1.15;
    this.PET005SubTotal = +this.PET005GrandTotal - +this.PET005Vat;
    console.log(this.PET005GrandTotal);
    console.log(this.PET005Vat);
    console.log(this.PET005SubTotal);

    // PET001
    this.PET001GrandTotal = +this.PET001mass * +this.PET001;
    this.PET001Vat = +this.PET001GrandTotal / 1.15;
    this.PET001SubTotal = +this.PET001GrandTotal - +this.PET001Vat;
    console.log(this.PET001GrandTotal);
    console.log(this.PET001Vat);
    console.log(this.PET001SubTotal);

    // PET003
    this.PET003GrandTotal = +this.PET003mass * +this.PET003;
    this.PET003Vat = +this.PET003GrandTotal / 1.15;
    this.PET003SubTotal = +this.PET003GrandTotal - +this.PET003Vat;
    console.log(this.PET003GrandTotal);
    console.log(this.PET003Vat);
    console.log(this.PET003SubTotal);

    // calculate overall prices
    this.calculateOverall();

    // push to update overall storage
    this.updateStorage();

  }

  getprices() {
    this.getprice = this.db.collection('price').onSnapshot(snapshot => {
      snapshot.forEach(element => {
        this.GH001 = element.data().gl001;
        this.HD001 = element.data().hd001;
        this.LD001 = element.data().ld001;
        this.LD003 = element.data().ld003;
        this.NFAL01 = element.data().nfalo1;
        this.PAP001 = element.data().pap001;
        this.PAP003 = element.data().pap003;
        this.PAP005 = element.data().pap005;
        this.PAP007 = element.data().pap007;
        this.PET001 = element.data().pet001;
        this.PET003 = element.data().pet003;
        this.PET005 = element.data().pet005;
        // console.log(element);
      });
      // console.log(this.GH001);
      // console.log(this.HD001);
      // console.log(this.LD003);
      // console.log(this.NFAL01);
      // console.log(this.PAP001);
      // console.log(this.PAP003);
      // console.log(this.PAP005);
      // console.log(this.PET001);
      // console.log(this.PET003);
      // console.log(this.PET005);
    });
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

  calculateOverall() {
    // overall GrandTotal
    this.OverallGrandTotal = +this.GH001GrandTotal + +this.NFAL01GrandTotal + +this.PAP005GrandTotal + +this.PAP007GrandTotal + +this.PAP001GrandTotal + 
    +this.PAP003GrandTotal + +this.HD001GrandTotal + +this.LD001GrandTotal + +this.LD003GrandTotal + +this.PET001GrandTotal + +this.PET003GrandTotal + +this.PET005GrandTotal;
    console.log(this.OverallGrandTotal);

    // overall GrandTotal
    this.OverallSubTotal = +this.GH001SubTotal + +this.NFAL01SubTotal + +this.PAP005SubTotal + +this.PAP007SubTotal + +this.PAP001SubTotal + 
    +this.PAP003SubTotal + +this.HD001SubTotal + +this.LD001SubTotal + +this.LD003SubTotal + +this.PET001SubTotal + +this.PET003SubTotal + +this.PET005SubTotal;
    console.log(this.OverallSubTotal);

    // overall GrandTotal
    this.OverallVat = +this.GH001Vat + +this.NFAL01Vat + +this.PAP005Vat + +this.PAP007Vat + +this.PAP001Vat +
    +this.PAP003Vat + +this.HD001Vat + +this.LD001Vat + +this.LD003Vat + +this.PET001Vat + +this.PET003Vat + +this.PET005Vat;
    console.log(this.OverallVat);
  }

  updateStorage() {
    // storageGH001
    this.storageGH001 = this.GH001storagemass + this.GH001mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({GL001: this.storageGH001});
    console.log(this.storageGH001);

    // storage NFAL01;
    this.storageNFAL01 = this.NFAL01storagemass + this.NFAL01mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({NFAL01: this.storageNFAL01});
    console.log(this.storageNFAL01);

    // storage PAP005;
    this.storagePAP005 = this.PAP005storagemass + this.PAP005mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PAP005: this.storagePAP005});
    console.log(this.storagePAP005);

    // storage PAP007;
    this.storagePAP007 = this.PAP007storagemass + this.PAP007mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PAP007: this.storagePAP007});
    console.log(this.storagePAP007);

    // storage PAP001;
    this.storagePAP001 = this.PAP001storagemass + this.PAP001mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PAP001: this.storagePAP001});
    console.log(this.storagePAP001);

    // storage PAP003;
    this.storagePAP003 = this.PAP003storagemass + this.PAP003mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PAP003: this.storagePAP003});
    console.log(this.storagePAP003);

    // storage HD001;
    this.storageHD001 = this.HD001storagemass + this.HD001mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({HD001: this.storageHD001});
    console.log(this.storageHD001);

    // storage LD001;
    this.storageLD001 = this.LD001storagemass + this.LD001mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({LD001: this.storageLD001});
    console.log(this.storageLD001);

    // storage LD003;
    this.storageLD003 = this.LD003storagemass + this.LD003mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({LD003: this.storageLD003});
    console.log(this.storageLD003);

    // storage PET001;
    this.storagePET001 = this.PET001storagemass + this.PET001mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PET001: this.storagePET001});
    console.log(this.storagePET001);

    // storage PET003;
    this.storagePET003 = this.PET003storagemass + this.PET003mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PET003: this.storagePET003});
    console.log(this.storagePET003);

    // storage PET005;
    this.storagePET005 = this.PET005storagemass + this.PET005mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PEP005: this.storagePET005});
    console.log(this.storagePET005);
  }

  Addreclaimer() {

    this.calculate();
   
    this.db.collection('reclaimers').doc().set({
      date: new Date(),
      name: this.name,
      surname: this.surname,
      address: this.address,
      contact: this.contact,
      GH001: this.GH001GrandTotal,
      GH001Vat: this.GH001Vat,
      GH001SubTotal: this.GH001SubTotal,
      NFAL01: this.NFAL01GrandTotal,
      NFAL01Vat: this.NFAL01Vat,
      NFAL01SubTotal: this.NFAL01SubTotal,
      PAP005: this.PAP005GrandTotal,
      PAP005Vat: this.PAP005Vat,
      PAP005SubTotal: this.PAP005SubTotal,
      PAP007: this.PAP007GrandTotal,
      PAP007Vat: this.PAP007Vat,
      PAP007SubTotal: this.PAP007SubTotal,
      PAP001: this.PAP001GrandTotal,
      PAP001Vat: this.PAP001Vat,
      PAP001SubTotal: this.PAP001SubTotal,
      PAP003: this.PAP003GrandTotal,
      PAP003Vat: this.PAP003Vat,
      PAP003SubTotal: this.PAP003SubTotal,
      HD001: this.HD001GrandTotal,
      HD001Vat: this.HD001Vat,
      HD001SubTotal: this.HD001SubTotal,
      LD001: this.LD001GrandTotal,
      LD001Vat: this.LD001Vat,
      LD001SubTotal: this.LD001SubTotal,
      LD003: this.LD003GrandTotal,
      LD003Vat: this.LD003Vat,
      LD003SubTotal: this.LD003SubTotal,
      PET001: this.PET001GrandTotal,
      PET001Vat: this.PET001Vat,
      PET001SubTotal: this.PET001SubTotal,
      PET003: this.PET003GrandTotal,
      PET003Vat: this.PET003Vat,
      PET003SubTotal: this.PET003SubTotal,
      PEP005: this.PET005GrandTotal,
      PEP005Vat: this.PET005Vat,
      PEP005SubTotal: this.PET005SubTotal,
      OverallSubTotal: this.OverallSubTotal,
      OverallVat: this.OverallVat,
      OverallGrandTotal: this.OverallGrandTotal,
    });
    this.route.navigate(['/home']);
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
      message: 'New Transaction Created.',
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
    this.modalcontroller.create({component: ModalpopupPage}).then((modalElement) => {
  modalElement.present();
    });
  }
}
