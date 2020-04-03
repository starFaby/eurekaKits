import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { Telefonoformvali } from 'src/app/validators/telefonoformvali';

@Component({
  selector: 'app-clienteleform',
  templateUrl: './clienteleform.component.html',
  styleUrls: ['./clienteleform.component.scss']
})
export class ClienteleformComponent implements OnInit {
  formTelefono: FormGroup;
  constructor(private matDialogRef: MatDialogRef<ClienteleformComponent>, private telefonoformvali: Telefonoformvali) {
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
    console.log(this.formTelefono.value);
  }


}
