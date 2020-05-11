import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DatePipe } from '@angular/common';
import { SafeResourceUrl } from '@angular/platform-browser';
import kjua from 'kjua';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-clientfactura',
  templateUrl: './clientfactura.component.html',
  styleUrls: ['./clientfactura.component.scss']
})
export class ClientfacturaComponent implements OnInit {

  urlSafe: SafeResourceUrl;
  prueba;
  navigationSubscription;
  public facturaReport: any;
  public doc;
  datos: boolean;
  pipe = new DatePipe('en-US'); // Use your own locale
  now = Date.now();
  myFormattedDate = this.pipe.transform(this.now, 'dd-MM-yyyy h:mm a ');
  totalPagesExp = '{total_pages_count_string}';
  getBarcodeData(text: string, size = 900) {
    return kjua({
      render: 'canvas',
      crisp: true,
      minVersion: 1,
      ecLevel: 'Q',
      size,
      ratio: undefined,
      fill: '#333',
      back: '#fff',
      text,
      rounded: 10,
      quiet: 2,
      mode: 'plain',
      mSize: 5,
      mPosX: 50,
      mPosY: 100,
      fontname: 'sans-serif',
      fontcolor: '#3F51B5',
      image: undefined
    });
  }
  constructor(
    private router: Router) {
    this.datos = false;
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        /*  this.id = atob(this.route.snapshot.params.id);
          this.nivel = atob(this.route.snapshot.params.nivel);
          this.periodo = atob(this.route.snapshot.params.periodo);
          this.carrera = atob(this.route.snapshot.params.carrera);*/
        // this.getHistoriabyid(this.id, this.nivel, this.periodo, this.carrera);
      }
    });
  }
  pageInit(e: HTMLElement) {
    e.scrollIntoView({ behavior: 'smooth' });
  }
  ngOnInit() {
    // this.onGetNumFactura();
    this.PdfViewer();

  }
  onGetNumFactura() {
    /* const id = 1;
     this.pdfviewService.getCedula().subscribe(
       res => {
         console.log(res);
         this.PdfViewer();
       },
       err => {
         console.log(err);
       }
     )*/

  }
  objectKey(obj) {
    return Object.keys(obj);
  }
  formatedCerts() {
    return this.facturaReport.reduce((prev, now) => {
      if (!prev[now.factura]) {
        prev[now.periodo] = [];
      }

      prev[now.factura].push(now);
      return prev;
    }, {});
  }
  getColumns() {
    const columns = [
      { title: 'CÓDIGO', dataKey: 'codigo' },
      { title: 'ASIGNATURAS', dataKey: 'asignaturas' },
      { title: 'CAMPUS', dataKey: 'campus' },
      { title: 'NIVEL CAPP', dataKey: 'nivel_asignatura' },
      { title: 'CREDITOS', dataKey: 'creditos' }
    ];
    return columns;
  }
  getheaderStyles() {
    const headerStyle = {
      fillColor: [200, 255, 255],
      textColor: 0,
      fontSize: 8
    };
    return headerStyle;
  }
  getbodyStyles() {
    const bodyStyle = {
      fillColor: [255, 255, 255],
      textColor: 0,
      fontSize: 8
    };
    return bodyStyle;
  }
  getalternateRowStyles() {
    const alternateRowStyle = {
      fillColor: [255, 255, 255],
      textColor: 0,
      fontSize: 8
    };
    return alternateRowStyle;
  }
  PdfViewer() {
    this.doc = new jsPDF('p', 'pt');
    this.doc.setFont('helvetica');
    // CABECERA
    this.doc.setFontSize(25);
    this.doc.setFontStyle('bold');
    this.doc.text('AUTOMATISMOS BRITO', 45, 35);
    this.doc.setFontSize(9);
    this.doc.setFontStyle('bold');
    this.doc.text('VENTA AL POR MAYOR DE EQUIPO DE SEGURIDAD', 70, 50);
    this.doc.setFontSize(9);
    this.doc.setFontStyle('bold');
    this.doc.text('Brito Saltos Roberto Alfonso', 120, 65);
    this.doc.setFontSize(9);
    this.doc.setFontStyle('bold');
    this.doc.text('Documento Categorizado: No', 118, 80);
    this.doc.setFontSize(9);
    this.doc.setFontStyle('bold');
    this.doc.text('Nueva Tola Baja 2, Caran N3-131 y Juan Abel Echeveria', 68, 95);
    this.doc.setFontSize(9);
    this.doc.setFontStyle('bold');
    this.doc.text('Telf: 2581389 * Cel. 0995054605 Quito - Ecuador', 84, 110);
    this.doc.setFontSize(9);
    this.doc.setFontStyle('bold');
    this.doc.text('email: automatismosbrito@hotmail.com', 96, 125);

    this.doc.rect(400, 15, 170, 110);
    this.doc.setFontSize(12);
    this.doc.setFontStyle('bold');
    this.doc.text('RUC: 1709765067001', 430, 32);
    this.doc.line(570, 40, 400, 40);
    this.doc.setFontSize(11);
    this.doc.setFontStyle('bold');
    this.doc.text('FACTURA 001 -001', 443, 55);
    this.doc.line(570, 60, 400, 60);
    this.doc.setFontSize(15);
    this.doc.setFontStyle('bold');
    this.doc.text('N°', 437, 78);
    this.doc.line(570, 85, 400, 85);
    this.doc.setFontSize(11);
    this.doc.setFontStyle('bold');
    this.doc.text('Aut.SRI. 1114971823', 435, 100);
    this.doc.setFontSize(7);
    this.doc.text('FECHA DE AUTORIZACION: 29-MAYO-2014', 415, 110);
    this.doc.setFontSize(7);
    this.doc.text('FECHA DE CADUCIDAD: 29-AGOSTO-2014', 415, 120);
    // DATOS DEL USUARIO
    this.doc.rect(27, 130, 543, 75);
    this.doc.setFontSize(9);
    this.doc.setFontStyle('bold');
    this.doc.text('CLIENTE:', 32, 150);
    this.doc.line(290, 150, 78, 150);
    this.doc.setFontSize(9);
    this.doc.text('Edgar fabian estrella guambugeuete', 82, 147);

    this.doc.setFontSize(9);
    this.doc.setFontStyle('bold');
    this.doc.text('DIRECCIÓN:', 32, 170);
    this.doc.line(290, 170, 90, 170);
    this.doc.setFontSize(9);
    this.doc.text('anonimo:', 94, 167);

    this.doc.setFontSize(9);
    this.doc.setFontStyle('bold');
    this.doc.text('TELEFONO:', 32, 190);
    this.doc.line(290, 190, 87, 190);
    this.doc.setFontStyle('bold');
    this.doc.text('anonimo', 91, 187);

    this.doc.setFontSize(9);
    this.doc.setFontStyle('bold');
    this.doc.text('RUC:', 300, 150);
    this.doc.line(560, 150, 327, 150);
    this.doc.setFontStyle('bold');
    this.doc.text('anonimo', 331, 147);

    this.doc.setFontSize(9);
    this.doc.setFontStyle('bold');
    this.doc.text('FECHA:', 300, 170);
    this.doc.line(560, 170, 338, 170);
    this.doc.setFontStyle('bold');
    this.doc.text('anonimo', 340, 167);

    this.doc.setFontSize(9);
    this.doc.setFontStyle('bold');
    this.doc.text('FORMA DE PAGO:', 300, 190);
    this.doc.line(560, 190, 385, 190);
    this.doc.setFontStyle('bold');
    this.doc.text('anonimo', 387, 187);

    // FOOTER
    this.doc.rect(27, 500, 543, 100);

    


    // INICIO X iNICIO Y, WHITH, HEIGHT
    this.doc.rect(27, 720, 175, 90);
    this.doc.line(32, 785, 197, 785);
    this.doc.setFontSize(9);
    this.doc.setFontStyle('bold');
    this.doc.text('ELABORADO POR', 80, 800);

    this.doc.rect(211, 720, 175, 90);
    this.doc.line(215, 785, 382, 785);
    this.doc.setFontSize(9);
    this.doc.setFontStyle('bold');
    this.doc.text('APROBADO POR', 267, 800);

    this.doc.rect(395, 720, 175, 90);
    this.doc.line(400, 785, 566, 785);
    this.doc.setFontSize(9);
    this.doc.setFontStyle('bold');
    this.doc.text('RECIBI CONFORME', 440, 800);


    /*const pageHeight =
      this.doc.internal.pageSize.height ||
      this.doc.internal.pageSize.getHeight();
    this.doc.text(this.myFormattedDate, 490, pageHeight - 15);*/
    this.viewPdf();
  }
  dowload() {
    this.doc.save('joder1');
  }
  viewPdf() {
    try {
      this.prueba = this.doc.output('datauristring');
    } catch (e) {
      console.log('Error' + e);
    }
  }

}
