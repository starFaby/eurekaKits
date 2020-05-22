import { Component, OnInit } from '@angular/core';
import { Personaformvali } from 'src/app/validators/personaformvali';
import { FormGroup } from '@angular/forms';
import { DireccionService } from 'src/app/services/direccion.service';
import { TelefonoService } from 'src/app/services/telefono.service';
import { Telefono } from 'src/app/models/telefono';
import { Direccion } from 'src/app/models/direccion';
import { Categoria } from 'src/app/models/categoria';
import { PersonaService } from 'src/app/services/persona.service';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material';
import { ClienteleformComponent } from 'src/app/views/home/clienteleform/clienteleform.component';
import { ClientdireccformComponent } from 'src/app/views/home/clientdireccform/clientdireccform.component';
import { Persona } from 'src/app/models/persona';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Personadminformvali } from 'src/app/validators/personadminformvali';

@Component({
  selector: 'app-personaform',
  templateUrl: './personaform.component.html',
  styleUrls: ['./personaform.component.scss']
})
export class PersonaformComponent implements OnInit {
  hide = true;
  arregloTelefono: Telefono[];
  arregloDireccion: Direccion[];
  arregloCategoria: Categoria[];
  formPersonaAdmin: FormGroup;
  constructor(
    private dialog: MatDialog,
    private matDialogRef: MatDialogRef<PersonaformComponent>,
    private personadminformvali: Personadminformvali,
    private personaService: PersonaService,
    private direccionService: DireccionService,
    private telefonoService: TelefonoService,
    private categoriaService: CategoriaService
  ) {
    this.formPersonaAdmin = this.personadminformvali.formPersonaAdmin;
  }

  ngOnInit() {
    this.onGetTelefonoAll();
    this.onGetDireccionesAll();
    this.onGetCategorias();
  }

  onGetReiniciarDirecTele() {
    console.log('entraste a telefono o direccion');
    this.onGetTelefonoAll();
    this.onGetDireccionesAll();
  }
  onGetDireccionesAll() {
    this.direccionService.onGetDireccions().subscribe(
      res => {
        this.arregloDireccion = res;
      },
      err => {
        console.log(err);
      }
    );
  }
  onGetTelefonoAll() {
    this.telefonoService.onGetTelefonos().subscribe(
      res => {
        this.arregloTelefono = res;
      },
      err => {
        console.log(err);
      }
    );
  }
  onGetCategorias() {
    this.categoriaService.onGetCategorias().subscribe(
      res => {
        console.log(res);
        this.arregloCategoria = res;
      },
      err => {
        console.log(err);
      }
    );
  }
  onOpenFormTelef() {
    //  this.productoformvali.oninitializeFomrGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ClienteleformComponent, dialogConfig);
  }
  onOpenFormDirecc() {
    //  this.productoformvali.oninitializeFomrGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ClientdireccformComponent, dialogConfig);
  }
  onSubmit() {
    if (this.formPersonaAdmin.valid) {
      if (this.formPersonaAdmin.get('idpersona').value == null) {
        const newPersona: Persona = {
          idtelefono: this.formPersonaAdmin.get('idtelefono').value,
          iddireccion: this.formPersonaAdmin.get('iddireccion').value,
          cedula: this.formPersonaAdmin.get('cedula').value,
          nombres: this.formPersonaAdmin.get('nombres').value,
          apellidos: this.formPersonaAdmin.get('apellidos').value,
          fechanacimiento: this.formPersonaAdmin.get('fechanacimiento').value,
          email: this.formPersonaAdmin.get('email').value,
          password: this.formPersonaAdmin.get('password').value,
          requerimiento: this.formPersonaAdmin.get('requerimiento').value,
          estado: this.formPersonaAdmin.get('estado').value,
        };
        this.personaService.onSavePersona(newPersona).subscribe(
          res => {
            console.log(res);
            this.onGetClear();
          },
          err => {
            console.log(err);
          }
        );
      } else {
        const idCategoria = this.formPersonaAdmin.get('idpersona').value;
        const newPersona: Persona = {
          idtelefono: this.formPersonaAdmin.get('idtelefono').value,
          iddireccion: this.formPersonaAdmin.get('iddireccion').value,
          cedula: this.formPersonaAdmin.get('cedula').value,
          nombres: this.formPersonaAdmin.get('nombres').value,
          apellidos: this.formPersonaAdmin.get('apellidos').value,
          fechanacimiento: this.formPersonaAdmin.get('fechanacimiento').value,
          email: this.formPersonaAdmin.get('email').value,
          password: this.formPersonaAdmin.get('password').value,
          requerimiento: this.formPersonaAdmin.get('requerimiento').value,
          estado: this.formPersonaAdmin.get('estado').value,
        };
        this.personaService.onUpdatePersona(idCategoria, newPersona).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      }
    }
  }
  onGetClear() {
    this.personadminformvali.oninitializeFomrGroup();
  }
  onGetClose() {
    this.formPersonaAdmin.reset();
    this.personadminformvali.oninitializeFomrGroup();
    this.matDialogRef.close();
  }
}
