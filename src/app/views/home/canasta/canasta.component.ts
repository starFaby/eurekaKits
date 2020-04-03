import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig, MatDialogRef } from '@angular/material';
import { DetalleVenta } from 'src/app/models/detalleventa';
import { DetaventaService } from 'src/app/services/detaventa.service';


@Component({
  selector: 'app-canasta',
  templateUrl: './canasta.component.html',
  styleUrls: ['./canasta.component.scss']
})
export class CanastaComponent implements OnInit {
  detalleVenta: DetalleVenta[];
  suma: any;
  iva: any;
  ivaTotal: any;
  total: any;
  constructor(private dialog: MatDialog,
              private detaventaService: DetaventaService
   // private categoriaformvali: Categoriaformvali
    ) {}
  //  form = this.categoriaformvali.formCategoria;
  listCanasta: MatTableDataSource<any>;
  displayedColumns: string[] = ['idFactura', 'idProducto', 'cantidad', 'precio', 'total', 'actions'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  searchKey: string;
  ngOnInit() {
    this.onGetDetaVentaAll();
  }
  onGetDetaVentaAll() {
    this.detaventaService.onGetDetaVentas().subscribe(
      res => {
        this.detalleVenta = res;
        this.suma = this.detalleVenta.map(t => t.total).reduce((acc, value) => acc + value);
        this.iva = this.suma * 0.12;
        this.ivaTotal = (this.suma * 0.12).toFixed(2);
        this.total = this.suma + this.iva;
        this.listCanasta = new MatTableDataSource(this.detalleVenta);
        this.listCanasta.sort = this.sort;
        this.listCanasta.paginator = this.paginator;
      },
      err => console.log(err)
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
