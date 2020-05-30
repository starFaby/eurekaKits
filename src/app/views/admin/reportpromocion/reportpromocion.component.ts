import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DatePipe } from '@angular/common';
import { SafeResourceUrl } from '@angular/platform-browser';
import kjua from 'kjua';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Reportpromociones } from 'src/app/models/reportpromociones';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reportpromocion',
  templateUrl: './reportpromocion.component.html',
  styleUrls: ['./reportpromocion.component.scss']
})
export class ReportpromocionComponent implements OnInit {
  urlSafe: SafeResourceUrl;
  reportpromociones: Reportpromociones[];
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
    private toast: ToastrService
  ) {
  }
  pageInit(e: HTMLElement) {
    e.scrollIntoView({ behavior: 'smooth' });
  }
  ngOnInit() {
    this.onGetFacturaPDF();
  }

  onGetFacturaPDF() {
    this.consultasService.onGetReportPromociones().subscribe(
      res => {
        if (res != null) {
          this.reportpromociones = res;
          this.PdfViewer();
        } else {
          this.toast.info('Info', 'No existe datos', {
            timeOut: 3000
          });
          this.router.navigate(['/nofound']);
        }
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 0) {
            this.toast.error('Error', 'Servidor Caido: Consulte con el administrador', {
              timeOut: 3000
            });
          }
        }
      }
    );
  }
  objectKey(obj) {
    return Object.keys(obj);
  }
  formatedCerts() {
    return this.reportpromociones.reduce((prev, now) => {
      if (!prev[now.estado]) {
        prev[now.estado] = [];
      }
      prev[now.estado].push(now);
      return prev;
    }, {});
  }
  getColumns() {
    const columns = [
      { title: 'NOMBRE', dataKey: 'nombre' },
      { title: 'DESCUENTO', dataKey: 'dto' },
      { title: 'FECHA INICIO', dataKey: 'fechainicio' },
      { title: 'FECHA FIN', dataKey: 'fechafin' },
      { title: 'DESCRIPCION', dataKey: 'descripcion' },
      { title: 'CREATED_AT', dataKey: 'created_at' }
    ];
    return columns;
  }
  getheadStyles() {
    const headerStyle = {
      fillColor: [200, 255, 255],
      textColor: 0,
      fontSize: 8,
      halign: 'center'
    };
    return headerStyle;
  }
  getbodyStyles() {
    const bodyStyle = {
      fillColor: [255, 255, 255],
      textColor: 0,
      fontSize: 8,
      halign: 'center'
    };
    return bodyStyle;
  }
  getalternateRowStyles() {
    const alternateRowStyle = {
      fillColor: [255, 255, 255],
      textColor: 0,
      fontSize: 8,
      halign: 'center'
    };
    return alternateRowStyle;
  }
  PdfViewer() {
    this.doc = new jsPDF('p', 'pt');
    this.doc.setFont('helvetica');
    let rows = [];
    const headStyles = this.getheadStyles();
    const bodyStyles = this.getbodyStyles();
    const alternateRowStyles = this.getalternateRowStyles();
    const pageContent = data => {
      // CABECERA
      this.doc.setFontSize(25);
      this.doc.setFontStyle('bold');
      this.doc.text('AUTOMATISMOS BRITO', 170, 35);
      this.doc.setFontSize(15);
      this.doc.setFontStyle('bold');
      this.doc.text('REPORTE DE PROMOCIONES', 220, 60);
    };


    let i = true;
    let first;
    for (const estado of this.objectKey(this.formatedCerts())) {
      for (const iterator of this.formatedCerts()[estado]) {
        rows.push({
          nombre: iterator.nombre,
          dto: iterator.dto,
          fechainicio: iterator.fechainicio,
          fechafin: iterator.fechafin,
          descripcion: iterator.descripcion,
          created_at: iterator.created_at
        });
      }
      this.doc.setFontStyle('blod');
      this.doc.setFontSize(8);
      this.doc.setTextColor(0);
      if (i) {
        this.doc.setLineWidth(1);
        this.doc.line(40, 80, 550, 80);
        this.doc.setFontStyle('blod');
        this.doc.setFontSize(8);
        this.doc.autoTable(this.getColumns(), rows, {
          startY: 90,
          margin: { top: 90, right: 40, bottom: 100 },
          didDrawPage: pageContent,
          // tslint:disable-next-line:object-literal-shorthand
          headStyles: headStyles,
          // tslint:disable-next-line:object-literal-shorthand
          bodyStyles: bodyStyles,
          // tslint:disable-next-line:object-literal-shorthand
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
          margin: { top: 90, right: 40, bottom: 100 },
          didDrawPage: pageContent,
          // tslint:disable-next-line:object-literal-shorthand
          alternateRowStyles: alternateRowStyles,
          // tslint:disable-next-line:object-literal-shorthand
          headStyles: headStyles,
          // tslint:disable-next-line:object-literal-shorthand
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
    }
    this.viewPdf();
  }
  dowloadPdf() {
    this.doc.save(`REPORTE DE PROMOCIONES`);
    this.toast.success('Exito', 'Descarga completada', {
      timeOut: 3000
    });
  }
  viewPdf() {
    try {
      this.urlSafe = this.doc.output('datauristring');
    } catch (e) {
      console.log('Error' + e);
    }
  }
}
