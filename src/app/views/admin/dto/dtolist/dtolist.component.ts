import { Component, OnInit, ViewChild } from '@angular/core';
import { Dto } from 'src/app/models/dto';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { Dtoformvali } from 'src/app/validators/dtoformvali';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Router } from '@angular/router';
import { DtoformComponent } from '../dtoform/dtoform.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dtolist',
  templateUrl: './dtolist.component.html',
  styleUrls: ['./dtolist.component.scss']
})
export class DtolistComponent implements OnInit {
  dto: Dto[];
  formDto: FormGroup;
  constructor(
    private dialog: MatDialog,
    private dtoformvali: Dtoformvali,
    private consultasService: ConsultasService,
    private router: Router
  ) {
    this.formDto = this.dtoformvali.formDto;
  }
  listDto: MatTableDataSource<any>;
  displayedColumns: string[] = ['dto', 'estado', 'actions'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  searchKey: string;
  ngOnInit() {
    this.onGetDtoAll();
  }
  onGetDtoAll() {
    this.consultasService.onGetDto().subscribe(
      res => {
        if (res != null) {
          console.log(res);
          this.dto = res;
          this.listDto = new MatTableDataSource(this.dto);
          this.listDto.sort = this.sort;
          this.listDto.paginator = this.paginator;
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
    this.listDto.filter = this.searchKey.trim().toLowerCase();
  }
  onSearchClear() {
    this.searchKey = '';
    this.searchFiltrer();
  }
  onCreate() {
    this.dtoformvali.oninitializeFomrGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(DtoformComponent, dialogConfig);
  }
  onEdit(row) {
    const newDto: Dto = {
      iddto: row.iddto,
      dto: row.dto,
      estado: row.estado
    };
    this.formDto.setValue(newDto);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(DtoformComponent, dialogConfig);
  }
}
