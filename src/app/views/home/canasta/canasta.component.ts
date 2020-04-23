import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig, MatDialogRef } from '@angular/material';
import { DetalleVenta } from 'src/app/models/detalleventa';
import { DetaventaService } from 'src/app/services/detaventa.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import jwt from 'jwt-decode';
import { Consultas } from 'src/app/models/consultas';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Fecha } from 'src/app/validators/fecha';
import { Numfactura } from 'src/app/models/numfactura';
import { Factura } from 'src/app/models/factura';


@Component({
  selector: 'app-canasta',
  templateUrl: './canasta.component.html',
  styleUrls: ['./canasta.component.scss']
})
export class CanastaComponent implements OnInit {
  detalleVenta: DetalleVenta[];
  persona: Consultas[];
  id;
  subTotal: any;
  iva: any;
  ivaTotal: any;
  total: any;
  fechaFact: any;
  prueba = 54;
  numFactura;
  constructor(
    private dialog: MatDialog,
    private detaventaService: DetaventaService,
    private router: Router,
    private authService: AuthService,
    private consultasService: ConsultasService,
    private fecha: Fecha,
    // private categoriaformvali: Categoriaformvali
  ) {
    this.fechaFact = this.fecha.dateExat();
  }
  //  form = this.categoriaformvali.formCategoria;
  listCanasta: MatTableDataSource<any>;
  displayedColumns: string[] = ['idFactura', 'idProducto', 'cantidad', 'precio', 'total', 'actions'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  searchKey: string;
  ngOnInit() {
    this.onGetId();
    this.onGetPersona();
    this.onGetDetaVentaAll();
    this.onGetNumFactura();
  }
  onGetId() {
    const token = this.authService.onGetToken();
    const aux = jwt(token);
    this.id = aux.subject;
    console.log(this.id);
  }
  onGetPersona() {
    this.consultasService.onGetPersonapdt(this.id).subscribe(
      res => {
        console.log(res);
        this.persona = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  onGetDetaVentaAll() {
    this.consultasService.onGetDetaVentadvp().subscribe(
      res => {
        this.detalleVenta = res;
        this.subTotal = this.detalleVenta.map(t => t.total).reduce((acc, value) => acc + value);
        this.iva = this.subTotal * 0.12;
        this.ivaTotal = (this.subTotal * 0.12).toFixed(2);
        this.total = this.subTotal + this.iva;
        this.listCanasta = new MatTableDataSource(this.detalleVenta);
        this.listCanasta.sort = this.sort;
        this.listCanasta.paginator = this.paginator;
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 404) {
            console.log('No existe datos');
          }
        }
      }
    );
    /*  this.categoriaService.onGetCategorias().subscribe(
        res => {
          this.arreglo = res;
          this.listCategoria = new MatTableDataSource(this.arreglo);
          this.listCategoria.sort = this.sort;
          this.listCategoria.paginator = this.paginator;
        },
        err => console.log(err)
      );*/
  }
  onGetNumFactura() {
    this.consultasService.onGetNumFact().subscribe(
      res => {
        console.log(res);
        this.onPrueba(res);
      },
      err => {
        console.log(err);
      }
    );
  }
  onPrueba(res: Numfactura[]) {
    res.map(t => {
      if (t.numfactura == null) {
        this.numFactura = '1';
        console.log('Estoy nulo', t.numfactura);
      } else {
        this.numFactura = t.numfactura;
        console.log('estoy lleno', t.numfactura);
      }
    });
  }
  onSubmitPrueba() {
    const newFactura: Factura = {
      id_persona: this.id,
      numfactura: this.numFactura,
      subtotal: this.subTotal,
      dto: '',
      iva: this.iva,
      total: this.total,
      estado: '1',
    };
    console.log(newFactura);
  }
  onSubmit() {
  }
  searchFiltrer() {
    this.listCanasta.filter = this.searchKey.trim().toLowerCase();
  }
  onSearchClear() {
    this.searchKey = '';
    this.searchFiltrer();
  }
  onCreate() {
    //  this.categoriaformvali.oninitializeFomrGroup();
    /*  const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      this.dialog.open(CanastaComponent, dialogConfig);*/
  }
  onDelete(row) {
    this.detaventaService.onDeleteDetaVenta(row).subscribe(
      res => {
        console.log(res);
        this.onGetDetaVentaAll();
      },
      err => console.log(err)
    );
  }
  onCloseDialog() {
    //  this.categoriaformvali.formCategoria.reset();
    //  this.categoriaformvali.oninitializeFomrGroup();
    // this.matDialogRef.close();
  }
}
