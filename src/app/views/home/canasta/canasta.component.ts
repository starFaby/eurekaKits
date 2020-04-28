import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig, MatDialogRef } from '@angular/material';
import { DetalleVentas } from 'src/app/models/detalleventa';
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
import { FacturaService } from 'src/app/services/factura.service';


@Component({
  selector: 'app-canasta',
  templateUrl: './canasta.component.html',
  styleUrls: ['./canasta.component.scss']
})
export class CanastaComponent implements OnInit {
  detalleVenta: DetalleVentas[];
  persona: Consultas[];
  fechaFact: any;
  id;
  newFactura: Factura = {
    idpersona: '',
    numfactura: 0,
    subtotal: 0,
    dto: 0,
    iva: 0,
    total: 0,
    estado: '1'
  };

  constructor(
    private dialog: MatDialog,
    private detaventaService: DetaventaService,
    private router: Router,
    private authService: AuthService,
    private consultasService: ConsultasService,
    private fecha: Fecha,
    private facturaService: FacturaService
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
   // setInterval(() => { this.onGetNumFactura(); }, 1000);
  }
  onGetId() {
    const token = this.authService.onGetToken();
    const aux = jwt(token);
    this.id = aux.subject;
    console.log(this.id);
    this.newFactura.idpersona = this.id;
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
        this.newFactura.subtotal = this.detalleVenta.map(t => t.total).reduce((acc, value) => acc + value);
        const auxIva = (this.newFactura.subtotal * 0.12);
        // tslint:disable-next-line:radix
        this.newFactura.iva = parseFloat( auxIva.toFixed(2));
        this.newFactura.total = this.newFactura.subtotal + this.newFactura.iva;
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
       // console.log(res);
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
        this.newFactura.numfactura = '0000001';
        // console.log('Estoy nulo', t.numfactura);
      } else {
        this.newFactura.numfactura = t.numfactura;
       //  console.log('estoy lleno', t.numfactura);
      }
    });
  }
  onSubmit() {
    this.facturaService.onSaveFactura(this.newFactura).subscribe(
      res => {
        console.log(res);
        localStorage.removeItem('idfactura');
        this.router.navigate(['/formaPago']);
      },
      err => {
        console.log(err);
      }
    );
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
