import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DatePipe } from '@angular/common';
import { SafeResourceUrl } from '@angular/platform-browser';
import kjua from 'kjua';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Reportproducto } from 'src/app/models/reportproducto';
import { Reportpersona } from 'src/app/models/reportpersona';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reportpersona',
  templateUrl: './reportpersona.component.html',
  styleUrls: ['./reportpersona.component.scss']
})
export class ReportpersonaComponent implements OnInit {
  urlSafe: SafeResourceUrl;
  public facturaReport: any;
  reportpersona: Reportpersona[];
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
    private toast: ToastrService
  ) {
  }
  pageInit(e: HTMLElement) {
    e.scrollIntoView({ behavior: 'smooth' });
  }
  ngOnInit() {
    this.onGetReportProducto();
  }

  onGetReportProducto() {
    this.consultasService.onGetReportPersona().subscribe(
      res => {
        if (res != null) {
          this.reportpersona = res;
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
    return this.reportpersona.reduce((prev, now) => {
      if (!prev[now.estado]) {
        prev[now.estado] = [];
      }
      prev[now.estado].push(now);
      return prev;
    }, {});
  }
  getColumns() {
    const columns = [
      { title: 'CONVENCIONAL', dataKey: 'convencional' },
      { title: 'SECTOR', dataKey: 'sector' },
      { title: 'CEDULA', dataKey: 'cedula' },
      { title: 'NOMBRES', dataKey: 'nombres' },
      { title: 'APELLIDOS', dataKey: 'apellidos' },
      { title: 'fECHANACIMIENTO', dataKey: 'fechanacimiento' },
      { title: 'EMAIL', dataKey: 'email' },
      { title: 'PASSWORD', dataKey: 'password' },
      { title: 'REQUERIMIENTO', dataKey: 'requerimiento' }
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
      this.doc.text('REPORTE DE PERSONAS', 220, 60);
    };


    let i = true;
    let first;
    for (const estado of this.objectKey(this.formatedCerts())) {
      for (const iterator of this.formatedCerts()[estado]) {
        rows.push({
          convencional: iterator.convencional,
          sector: iterator.sector,
          cedula: iterator.cedula,
          nombres: iterator.nombres,
          apellidos: iterator.apellidos,
          fechanacimiento: iterator.fechanacimiento,
          email: iterator.email,
          password: iterator.password,
          requerimiento: iterator.requerimiento,
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
    this.doc.save(`REPORTE PERSONA`);
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
