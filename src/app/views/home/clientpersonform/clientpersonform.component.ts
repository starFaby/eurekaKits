import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
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
import { ConsultasService } from 'src/app/services/consultas.service';
import { Email } from 'src/app/models/email';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clientpersonform',
  templateUrl: './clientpersonform.component.html',
  styleUrls: ['./clientpersonform.component.scss']
})
export class ClientpersonformComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('emailclear', { static: false }) emailclear: ElementRef;
  hide = true;
  token;
  id;
  arregloTelefono: Telefono[];
  arregloDireccion: Direccion[];
  arregloCategoria: Categoria[];
  email: Email[];
  formPersona: FormGroup;
  constructor(
    private dialog: MatDialog,
    private personaformvali: Personaformvali,
    private direccionService: DireccionService,
    private telefonoService: TelefonoService,
    private authService: AuthService,
    private router: Router,
    private categoriaService: CategoriaService,
    private consultasService: ConsultasService,
    private toast: ToastrService,
    private renderer: Renderer2
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
  onGetEmail(event) {
    const newEmail: Email = {
      email: event.target.value
    };
    this.consultasService.onGetEmail(newEmail).subscribe(
      res => {
        if (res !== null) {
          this.renderer.setProperty(this.emailclear.nativeElement, 'value', '');
          this.toast.info('Existe', 'Ya Existe el email', {
            timeOut: 3000
          });
        } else {
          this.toast.info('info', 'Email valido', {
            timeOut: 3000
          });
        }
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
          idtelefono: this.formPersona.get('idtelefono').value,
          iddireccion: this.formPersona.get('iddireccion').value,
          cedula: this.formPersona.get('cedula').value,
          nombres: this.formPersona.get('nombres').value,
          apellidos: this.formPersona.get('apellidos').value,
          fechanacimiento: this.formPersona.get('fechanacimiento').value,
          email: this.formPersona.get('email').value,
          password: this.formPersona.get('password').value,
          requerimiento: this.formPersona.get('requerimiento').value,
          estado: this.formPersona.get('estado').value,
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
