import { Component, OnInit, ViewChild } from '@angular/core';
import { PromocionService } from 'src/app/services/promocion.service';
import { Promocion } from 'src/app/models/promocion';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { Promoformvali } from 'src/app/validators/promoformvali';
import { FormGroup } from '@angular/forms';
import { PromoformComponent } from '../promoform/promoform.component';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Promocionpp } from 'src/app/models/promocionpp';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-promolist',
  templateUrl: './promolist.component.html',
  styleUrls: ['./promolist.component.scss']
})
export class PromolistComponent implements OnInit {
  formPromo: FormGroup;
  promocion: Promocionpp[];
  constructor(
    private dialog: MatDialog,
    private promocionService: PromocionService,
    private promoformvali: Promoformvali,
    private consultasService: ConsultasService,
    private router: Router,
    private toast: ToastrService
  ) {
    this.formPromo = this.promoformvali.formPromo;
  }
  listPromo: MatTableDataSource<any>;
  displayedColumns: string[] = ['producto', 'descuento', 'fechainicio', 'fechafin', 'descripcion', 'estado', 'actions'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  searchKey: string;
  ngOnInit() {
    this.onGetCategoriasAll();
  }
  onGetCategoriasAll() {
    this.consultasService.onGetPromocionpp().subscribe(
      res => {
        if (res != null) {
          this.promocion = res;
          this.listPromo = new MatTableDataSource(this.promocion);
          this.listPromo.sort = this.sort;
          this.listPromo.paginator = this.paginator;
        } else {
          this.onCreate();
          this.toast.info('Info', 'No existen Datos', {
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
  searchFiltrer() {
    this.listPromo.filter = this.searchKey.trim().toLowerCase();
  }
  onSearchClear() {
    this.searchKey = '';
    this.searchFiltrer();
  }
  onCreate() {
    this.promoformvali.oninitializeFomrGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(PromoformComponent, dialogConfig);
  }
  async onEdit(row) {
    const newPromocion: Promocion = {
      idpromociones: row.idpromociones,
      idproducto: null,
      dto: row.dto,
      fechainicio: row.fechainicio,
      fechafin: row.fechafin,
      descripcion: row.descripcion,
      estado: row.estado
    };
    this.formPromo.setValue(newPromocion);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(PromoformComponent, dialogConfig);
  }
  onDelete(id) {
    const newPromocion: Promocion = {
      estado: 0
    };
    this.promocionService.onDeletePromocion(id, newPromocion).subscribe(
      res => {
        console.log(res);
        this.toast.success('Exito', 'Promoción Eliminada', {
          timeOut: 3000
        });
        this.onGetCategoriasAll();
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

}
