import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { ProductoService } from 'src/app/services/producto.service';
import { ProductoformComponent } from '../productoform/productoform.component';
import { Productoformvali } from 'src/app/validators/productoformvali';
import { Producto } from 'src/app/models/producto';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Productoview } from 'src/app/models/productoview';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productolist',
  templateUrl: './productolist.component.html',
  styleUrls: ['./productolist.component.scss']
})
export class ProductolistComponent implements OnInit {
  productosview: Productoview[];
  file: File;
  constructor(
    private dialog: MatDialog,
    private productoService: ProductoService,
    private productoformvali: Productoformvali,
    private consultasService: ConsultasService,
    private router: Router
  ) { }
  form = this.productoformvali.formProducto;
  listProductos: MatTableDataSource<any>;
  displayedColumns: string[] = ['categoria', 'nombre', 'image', 'precio', 'stock', 'estado', 'actions'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.onGetProducto();
  }
  onGetProducto() {
    this.consultasService.onGetProducto().subscribe(
      res => {
        if (res != null) {
          this.productosview = res;
          this.listProductos = new MatTableDataSource(this.productosview);
          this.listProductos.sort = this.sort;
          this.listProductos.paginator = this.paginator;
        } else {
          this.onCreate();
          this.router.navigate(['/nofound']);
          console.log('No datos');
        }
      },
      err => console.log(err)
    );
  }
  searchFiltrer() {
    this.listProductos.filter = this.searchKey.trim().toLowerCase();
  }
  onSearchClear() {
    this.searchKey = '';
    this.searchFiltrer();
  }
  onCreate() {
    this.productoformvali.oninitializeFomrGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ProductoformComponent, dialogConfig);
  }
  onEdit(row) {
    const newproducto: Producto = {
      idproducto: row.idproducto,
      idcategoria: null,
      nombre: row.nombre,
      image: null,
      precio: row.precio,
      stock: row.stock,
      estado: row.estado
    };
    this.form.setValue(newproducto);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ProductoformComponent, dialogConfig);
  }
  onDelete(id) {
    const newProducto: Producto = {
      estado: 0
    };
    this.productoService.onDeleteProductos(id, newProducto).subscribe(
      res => {
        console.log(res);
        this.onGetProducto();
      },
      err => console.log(err)
    );
  }
}
