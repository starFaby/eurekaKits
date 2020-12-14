import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Factadmin } from 'src/app/models/factadmin';
import { ConsultasService } from 'src/app/services/consultas.service';

@Component({
  selector: 'app-factadmin',
  templateUrl: './factadmin.component.html',
  styleUrls: ['./factadmin.component.scss']
})
export class FactadminComponent implements OnInit {
  private factadmin: Factadmin[];
  constructor(
    private consultasService: ConsultasService,
    private router: Router,
    private toast: ToastrService) { }
  listfactadmin: MatTableDataSource<any>;
  displayedColumns: string[] = ['cedula', 'nombres', 'apellidos', 'numfactura', 'total', 'fecha'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  searchKey: string;
  ngOnInit() {
    this.onGetFactAdmin();
  }
  onGetFactAdmin() {
    this.consultasService.onGetFactAdmin().subscribe(
      res => {
        if (res != null) {
          this.factadmin = res;
          this.listfactadmin = new MatTableDataSource(this.factadmin);
          this.listfactadmin.sort = this.sort;
          this.listfactadmin.paginator = this.paginator;
        } else {
          this.router.navigate(['/nofound']);
          console.log('No datos');
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
    this.listfactadmin.filter = this.searchKey.trim().toLowerCase();
  }
  onSearchClear() {
    this.searchKey = '';
    this.searchFiltrer();
  }
}
