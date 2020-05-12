import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DatePipe } from '@angular/common';
import { SafeResourceUrl } from '@angular/platform-browser';
import kjua from 'kjua';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Consultas } from 'src/app/models/consultas';
import { Facturadv } from 'src/app/models/facturadv';
import { Facturatotal } from 'src/app/models/Facturatotal';

@Component({
  selector: 'app-clientfactura',
  templateUrl: './clientfactura.component.html',
  styleUrls: ['./clientfactura.component.scss']
})
export class ClientfacturaComponent implements OnInit {
  id;
  persona: Consultas[];
  facturadv: Facturadv[];
  facturatotal: Facturatotal[];
  fechaFactura;
  tipoPago;
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
    private router: Router,
    private consultasService: ConsultasService,
    private activatedRoute: ActivatedRoute,
  ) {
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
    this.onGetPersona();
    this.onGetFacturaPDF();
  }
  onGetPersona() {
    const idpersona = localStorage.getItem('idpersona');
    this.consultasService.onGetPersonapdt(idpersona).subscribe(
      res => {
        console.log(res);
        this.persona = res.map(t => t);
      },
      err => {
        console.log(err);
      }
    );
  }
  onGetFacturaPDF() {
    this.activatedRoute.params.subscribe(
      param => {
        // tslint:disable-next-line:no-string-literal
        this.id = param['id'];
        this.consultasService.onGetFacturadv(this.id).subscribe(
          res => {
            console.log(res);
            this.consultasService.onGetFacturaTotal(this.id).subscribe(
              datat => {
                console.log(datat);
                this.facturatotal = datat.map(t => t);
                const date = new Date(this.facturatotal[0].created_at);
                this.fechaFactura = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`;
                if (this.facturatotal[0].idtipopago === 1) {
                  this.tipoPago = 'Paypal';
                } else if (this.facturatotal[0].idtipopago === 2) {
                  this.tipoPago = 'Transferencia Bancaria';
                } else if (this.facturatotal[0].idtipopago === 3) {
                  this.tipoPago = 'Efectivo';
                }
                this.PdfViewer();
              },
              err => {
                console.log(err);
              }
            );
          },
          err => {
            console.log(err);
          }
        );
      }
    );
  }
  objectKey(obj) {
    return Object.keys(obj);
  }
  formatedCerts() {
    /*  return this.facturaReport.reduce((prev, now) => {
        if (!prev[now.factura]) {
          prev[now.periodo] = [];
        }
        prev[now.factura].push(now);
        return prev;
      }, {});*/
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
    let rows = [];
    const headerStyles = this.getheaderStyles();
    const bodyStyles = this.getbodyStyles();
    const alternateRowStyles = this.getalternateRowStyles();
    //  const pageContent = data => {
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
    this.doc.text(`${this.persona[0].nombres} ${this.persona[0].apellidos}`, 82, 147);

    this.doc.setFontSize(9);
    this.doc.setFontStyle('bold');
    this.doc.text('DIRECCIÓN:', 32, 170);
    this.doc.line(290, 170, 90, 170);
    this.doc.setFontSize(9);
    this.doc.text(`${this.persona[0].sector} ${this.persona[0].calleprincipal} ${this.persona[0].numeracion}`
      + ` ${this.persona[0].callesecundaria}`, 94, 167);

    this.doc.setFontSize(9);
    this.doc.setFontStyle('bold');
    this.doc.text('TELEFONO:', 32, 190);
    this.doc.line(290, 190, 87, 190);
    this.doc.setFontStyle('bold');
    this.doc.text(`${this.persona[0].convencional} / ${this.persona[0].celular1} / ${this.persona[0].celular2}`, 91, 187);

    this.doc.setFontSize(9);
    this.doc.setFontStyle('bold');
    this.doc.text('RUC:', 300, 150);
    this.doc.line(560, 150, 327, 150);
    this.doc.setFontStyle('bold');
    this.doc.text(`${this.persona[0].cedula}`, 331, 147);

    this.doc.setFontSize(9);
    this.doc.setFontStyle('bold');
    this.doc.text('FECHA:', 300, 170);
    this.doc.line(560, 170, 338, 170);
    this.doc.setFontStyle('bold');
    this.doc.text(`${this.fechaFactura} `, 340, 167);

    this.doc.setFontSize(9);
    this.doc.setFontStyle('bold');
    this.doc.text('FORMA DE PAGO:', 300, 190);
    this.doc.line(560, 190, 385, 190);
    this.doc.setFontStyle('bold');
    this.doc.text(`${this.tipoPago}`, 387, 187);

    // BODY

    // FOOTER
    this.doc.rect(27, 554, 543, 100); // detale de la compra total
    this.doc.setFontSize(9);
    this.doc.setFontStyle('bold');
    this.doc.text('Son:', 32, 575);
    this.doc.line(150, 575, 56, 575);
    this.doc.line(32, 590, 100, 590);

    this.doc.setFontSize(9);
    this.doc.setFontStyle('bold');
    this.doc.text('Observaciones:', 32, 605);
    this.doc.line(200, 605, 104, 605);
    this.doc.line(32, 620, 100, 620);
    this.doc.line(32, 635, 100, 635);

    this.doc.rect(27, 657, 543, 60); // Rectangulo para el  contenido
    this.doc.setFontSize(6);
    this.doc.setFontStyle('bold');
    this.doc.text('Con la entrega de esta Factura el cliente reconoce su'
      + 'obligacion incondicional de pago a la fecha de vencimiento.........................................'
      + 'tambien se obliga a pagar en caso de mora el', 32, 670);
    this.doc.setFontSize(6);
    this.doc.setFontStyle('bold');
    this.doc.text(' interes de ..................., las partes le dan a '
      + 'este instrumento de caracter ejecutivo por ser pura, simple y de plazo vencido.', 32, 680);
    this.doc.setFontSize(6);
    this.doc.setFontStyle('bold');
    this.doc.text('Se sujeta a los jueces de lo civil de la provincia de pichincha y/o al tramite '
      + 'que elija el acreedor,para cuyo efecto renuncia fuero, domicilio y vencidad.', 32, 690);
    this.doc.setFontSize(6);
    this.doc.setFontStyle('bold');
    this.doc.text('Eximese de presentación para aceptación y pago, asi como de aviso por falta de estos hechos.', 32, 700);
    this.doc.setFontSize(6);
    this.doc.setFontStyle('bold');
    this.doc.text('Salida de mercadería y recibida conforme, no se aceptan reclamos ni devoluciones.', 32, 710);

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
    //    };


    let i = true;
    let first;
    /*    for (const periodo of this.objectKey(this.formatedCerts())) {
          for (const iterator of this.formatedCerts()[periodo]) {
            rows.push({
              codigo: iterator.codigo,
              asignaturas: iterator.asignaturas,
              campus: iterator.campus,
              nivel_asignatura: iterator.nivel_asignatura,
              creditos: iterator.creditos
            });
          }
          this.doc.setFontStyle('blod');
          this.doc.setFontSize(8);
          this.doc.setTextColor(0);
          if (i) {
            this.doc.setLineWidth(1);
            this.doc.line(40, 288, 550, 288);
            this.doc.setFontStyle('blod');
            this.doc.setFontSize(8);
            this.doc.autoTable(this.getColumns(), rows, {
              startY: 305,
              margin: { top: 205, right: 40, bottom: 100 },
              addPageContent: pageContent,
              headerStyles: headerStyles,
              bodyStyles: bodyStyles,
              alternateRowStyles: alternateRowStyles,
              styles: {
                cellPadding: 2,
                fontSize: 7,
                valign: 'middle',
                overflow: 'linebreak',
                tableWidth: 'auto',
                lineWidth: 0
              }
            }); // generando
            i = false;
          } else {
            this.doc.setLineWidth(1);
            this.doc.line(40, first.finalY + 3, 550, first.finalY + 3);
            this.doc.setFontStyle('blod');
            this.doc.setFontSize(8);
            this.doc.autoTable(this.getColumns(), rows, {
              startY: first.finalY + 20,
              margin: { top: 205, right: 40, bottom: 100 },
              addPageContent: pageContent,
              alternateRowStyles: alternateRowStyles,
              headerStyles: headerStyles,
              bodyStyles: bodyStyles,
              styles: {
                cellPadding: 2,
                fontSize: 7,
                valign: 'middle',
                overflow: 'linebreak',
                tableWidth: 'auto',
                lineWidth: 0
              }
            }); // generando
          }
          first = this.doc.autoTable.previous;
          rows = [];
        }*/


    /*const pageHeight =
      this.doc.internal.pageSize.height ||
      this.doc.internal.pageSize.getHeight();
    this.doc.text(this.myFormattedDate, 490, pageHeight - 15);*/
    const rows1 = [];
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
