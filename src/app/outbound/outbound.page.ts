import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform } from '@ionic/angular';
import * as firebase from 'firebase';

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
  }
 




  db = firebase.firestore();

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

  pdfObj = null;
  constructor(private plt: Platform, private file: File, private fileOpener: FileOpener)
  
  
  { 

     this.getprices();
    this.getMasses();
  }

  ngOnInit() {
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
      console.log(this.GH001);
      console.log(this.HD001);
      console.log(this.LD003);
      console.log(this.NFAL01);
      console.log(this.PAP001);
      console.log(this.PAP003);
      console.log(this.PAP005);
      console.log(this.PET001);
      console.log(this.PET003);
      console.log(this.PET005);
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
  
  createPdf() {



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
          ul: [
            this.GH001Vat,
            this.GH001SubTotal,
            this.PET003GrandTotal,
            this.PET003Vat,
            this.PET003SubTotal,
            this.NFAL01GrandTotal,
            this.NFAL01Vat,
            this.NFAL01SubTotal,
            this.PAP005GrandTotal,
            this.PAP005Vat,
            this.PAP005SubTotal,
            this.PAP007GrandTotal,
            this.PAP007Vat,
            this.PAP007SubTotal,
            this.PAP001GrandTotal,
            this.PAP001Vat,
            this.PAP001SubTotal,
            this.PAP003GrandTotal,
            this.PAP003Vat,
            this.PAP003SubTotal,
            this.HD001GrandTotal,
            this.HD001Vat,
            this.HD001SubTotal,
            this.LD001GrandTotal,
            this.LD001Vat,
            this.LD001SubTotal,
            this.LD003GrandTotal,
            this.LD003Vat,
            this.LD003SubTotal,
            this.PET005GrandTotal,
             this.PET005Vat,
            this.PET005SubTotal,
            this.PET001GrandTotal,
            this.PET001Vat,
            this.PET001SubTotal,
            this.PET003GrandTotal,
          this.PET003Vat,
            this.PET003SubTotal,
          ]
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }



    }
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
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }

}
