import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
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
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Email } from 'src/app/models/email';

@Component({
  selector: 'app-personaform',
  templateUrl: './personaform.component.html',
  styleUrls: ['./personaform.component.scss']
})
export class PersonaformComponent implements OnInit {
  @ViewChild('emailclear', { static: false }) emailclear: ElementRef;
  hide = true;
  arregloTelefono: Telefono[];
  arregloDireccion: Direccion[];
  arregloCategoria: Categoria[];
  email: Email[];
  formPersonaAdmin: FormGroup;
  constructor(
    private dialog: MatDialog,
    private matDialogRef: MatDialogRef<PersonaformComponent>,
    private personadminformvali: Personadminformvali,
    private personaService: PersonaService,
    private direccionService: DireccionService,
    private telefonoService: TelefonoService,
    private categoriaService: CategoriaService,
    private toast: ToastrService,
    private consultasService: ConsultasService,
    private renderer: Renderer2
  ) {
    this.formPersonaAdmin = this.personadminformvali.formPersonaAdmin;
  }

  ngOnInit() {
    this.onGetTelefonoAll();
    this.onGetDireccionesAll();
    this.onGetCategorias();
  }

  onGetReiniciarDirecTele() {
    this.onGetTelefonoAll();
    this.onGetDireccionesAll();
  }
  onGetDireccionesAll() {
    this.direccionService.onGetDireccions().subscribe(
      res => {
        if (res !== null) {
          this.arregloDireccion = res;
        } else {
          this.toast.success('Info', 'No existe Dirección', {
            timeOut: 3000
          });
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
  onGetTelefonoAll() {
    this.telefonoService.onGetTelefonos().subscribe(
      res => {
        if (res !== null) {
          this.arregloTelefono = res;
        } else {
          this.toast.success('Info', 'No existe Telefonos', {
            timeOut: 3000
          });
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
  onGetCategorias() {
    this.categoriaService.onGetCategorias().subscribe(
      res => {
        if (res !== null) {
          this.arregloCategoria = res;
        } else {
          this.toast.success('Info', 'No existe Categorias', {
            timeOut: 3000
          });
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
            this.toast.success('Exito', 'Persona Agregada', {
              timeOut: 3000
            });
            this.onGetClose();
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
            this.toast.success('Exito', 'Persona Actualizada', {
              timeOut: 3000
            });
            this.onGetClose();
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
  }
  onGetClose() {
    this.formPersonaAdmin.reset();
    this.personadminformvali.oninitializeFomrGroup();
    this.matDialogRef.close();
  }
  onGetClear() {
    this.personadminformvali.oninitializeFomrGroup();
    this.formPersonaAdmin.reset();
  }
}
