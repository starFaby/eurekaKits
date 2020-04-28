import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { Telefonoformvali } from 'src/app/validators/telefonoformvali';
import { TelefonoService } from 'src/app/services/telefono.service';
import { Telefono } from 'src/app/models/telefono';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clienteleform',
  templateUrl: './clienteleform.component.html',
  styleUrls: ['./clienteleform.component.scss']
})
export class ClienteleformComponent implements OnInit {
  formTelefono: FormGroup;
  constructor(
    private matDialogRef: MatDialogRef<ClienteleformComponent>,
    private telefonoformvali: Telefonoformvali,
    private telefonoService: TelefonoService,
    private router: Router) {
    this.formTelefono = this.telefonoformvali.formTelefono;
  }

  ngOnInit() {
  }
  onCloseDialog() {
    // this.categoriaformvali.formCategoria.reset();
    // this.categoriaformvali.oninitializeFomrGroup();
    this.matDialogRef.close();
  }
  onSubmit() {
    if (this.formTelefono.valid) {
      if (this.formTelefono.get('idtelefono').value == null) {
        const newTelefono: Telefono = {
          domisoci: this.formTelefono.get('domisoci').value,
          convencional: this.formTelefono.get('convencional').value,
          celular1: this.formTelefono.get('celular1').value,
          celular2: this.formTelefono.get('celular2').value,
          estado: this.formTelefono.get('estado').value,
        };
        this.telefonoService.onSaveTelefono(newTelefono).subscribe(
          res => {
            console.log(res);
            this.router.navigate(['/registForm']);
          },
          err => {
            console.log(err);
          }
        );
        this.onCloseDialog();
      }
    }
  }


}
