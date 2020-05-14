import { Component, OnInit, ViewChild } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { ConsultasService } from 'src/app/services/consultas.service';
import { PersonaformComponent } from '../personaform/personaform.component';
import { Personaformvali } from 'src/app/validators/personaformvali';
import { PersonaService } from 'src/app/services/persona.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-personalist',
  templateUrl: './personalist.component.html',
  styleUrls: ['./personalist.component.scss']
})
export class PersonalistComponent implements OnInit {
  cont; // sirve para actualizar desde el evento mousemover la lista de personas
  persona: Persona[];
  personaForm;
  constructor(
    private dialog: MatDialog,
    private consultasService: ConsultasService,
    private personaformvali: Personaformvali,
    private personaService: PersonaService,
    private router: Router
  ) {
    this.personaForm = this.personaformvali.formPersona;
  }
  listPersona: MatTableDataSource<any>;
  // tslint:disable-next-line:max-line-length
  displayedColumns: string[] = ['cedula', 'nombres', 'apellidos', 'fechanacimiento', 'convencional', 'sector', 'email', 'password', 'requerimiento', 'estado', 'actions'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.onGetPersonaAll();
  }
  onGetPersonaAll() {
    this.consultasService.onGetPersona().subscribe(
      res => {
        if (res != null) {
          this.persona = res;
          this.listPersona = new MatTableDataSource(this.persona);
          this.listPersona.sort = this.sort;
          this.listPersona.paginator = this.paginator;
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
    this.listPersona.filter = this.searchKey.trim().toLowerCase();
  }
  onSearchClear() {
    this.searchKey = '';
    this.searchFiltrer();
  }
  onCreate() {
    // this.categoriaformvali.oninitializeFomrGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(PersonaformComponent, dialogConfig);
  }
  onEdit(row) {
    const newPersona: Persona = {
      idpersona: row.idpersona,
      idtelefono: null,
      iddireccion: null,
      cedula: row.cedula,
      nombres: row.nombres,
      apellidos: row.apellidos,
      fechanacimiento: row.fechanacimiento,
      email: row.email,
      password: row.password,
      requerimiento: row.requerimiento,
      estado: row.estado,
    };
    console.log(newPersona);
    this.personaForm.setValue(newPersona);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(PersonaformComponent, dialogConfig);
  }
  onDelete(id) {
    const newPersona: Persona = {
      estado: 0
    };

    this.personaService.onDeletePersona(id, newPersona).subscribe(
      res => {
        console.log(res);
        this.onGetPersonaAll();
      },
      err => console.log(err)
    );
  }
}
