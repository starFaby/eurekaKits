import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSelect } from '@angular/material';
import { ClienteleformComponent } from '../clienteleform/clienteleform.component';
import { ClientdireccformComponent } from '../clientdireccform/clientdireccform.component';
import { FormGroup, FormControl } from '@angular/forms';
import { Personaformvali } from 'src/app/validators/personaformvali';
import { DireccionService } from 'src/app/services/direccion.service';
import { TelefonoService } from 'src/app/services/telefono.service';
import { Direccion } from 'src/app/models/direccion';
import { Telefono } from 'src/app/models/telefono';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { AuthService } from 'src/app/services/auth.service';
import jwt from 'jwt-decode';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/app/models/categoria';

@Component({
  selector: 'app-clientpersonform',
  templateUrl: './clientpersonform.component.html',
  styleUrls: ['./clientpersonform.component.scss']
})
export class ClientpersonformComponent implements OnInit, AfterViewInit, OnDestroy {
  hide = true;
  token;
  id;
  arregloTelefono: Telefono[];
  arregloDireccion: Direccion[];
  arregloCategoria: Categoria[];
  formPersona: FormGroup;
  constructor(
    private dialog: MatDialog,
    private personaformvali: Personaformvali,
    private direccionService: DireccionService,
    private telefonoService: TelefonoService,
    private authService: AuthService,
    private router: Router,
    private categoriaService: CategoriaService
  ) {
    this.formPersona = this.personaformvali.formPersona;
  }
  ngOnInit() {
    this.onGetTelefonoAll();
    this.onGetDireccionesAll();
    this.onGetCategorias();
  }
  ngAfterViewInit() {
  }
  ngOnDestroy() {
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
    if (this.formPersona.valid) {
      if (this.formPersona.get('idpersona').value == null) {
        const newPersona: Persona = {
          idtelefono: this.formPersona.get('idtelefono').value.trim(),
          iddireccion: this.formPersona.get('iddireccion').value.trim(),
          cedula: this.formPersona.get('cedula').value.trim(),
          nombres: this.formPersona.get('nombres').value.trim(),
          apellidos: this.formPersona.get('apellidos').value.trim(),
          fechanacimiento: this.formPersona.get('fechanacimiento').value.trim(),
          email: this.formPersona.get('email').value.trim(),
          password: this.formPersona.get('password').value.trim(),
          requerimiento: this.formPersona.get('requerimiento').value.trim(),
          estado: this.formPersona.get('estado').value.trim(),
        };
        this.authService.onLoginUp(newPersona).subscribe(
          res => {
            console.log(res);
            // tslint:disable-next-line:no-string-literal
            this.token = res['token'];
            localStorage.setItem('idpersona', this.onGetIdPersona(this.token));
            localStorage.setItem('token', this.token);
            this.router.navigate(['/clientCategoriaoList']);
            this.onGetClear();
          },
          err => {
            console.log(err);
          }
        );
      }
    }
  }
  onGetClear() {
    this.personaformvali.oninitializeFomrGroup();
  }
  onGetIdPersona(idpersona: string) {
    const aux = jwt(idpersona);
    const newIdPersona = aux.subject;
    return newIdPersona;
  }

}
