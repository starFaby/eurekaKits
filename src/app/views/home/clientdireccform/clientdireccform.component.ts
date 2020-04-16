import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Direccionformvali } from 'src/app/validators/direccionformvali';
import { FormGroup } from '@angular/forms';
import { DireccionService } from 'src/app/services/direccion.service';
import { Direccion } from 'src/app/models/direccion';

@Component({
  selector: 'app-clientdireccform',
  templateUrl: './clientdireccform.component.html',
  styleUrls: ['./clientdireccform.component.scss']
})
export class ClientdireccformComponent implements OnInit {
  formDireccion: FormGroup;
  constructor(private matDialogRef: MatDialogRef<ClientdireccformComponent>,
              private direccionformvali: Direccionformvali,
              private direccionService: DireccionService) {
     this.formDireccion = this.direccionformvali.formDireccion;
   }

  ngOnInit() {
  }
  onCloseDialog() {
    // this.categoriaformvali.formCategoria.reset();
    // this.categoriaformvali.oninitializeFomrGroup();
    this.matDialogRef.close();
  }
  onSubmit() {
    if (this.formDireccion.valid) {
      if(this.formDireccion.get('iddireccion').value == null){
          const newDireccion: Direccion = {
            provincia: this.formDireccion.get('provincia').value,
            canton: this.formDireccion.get('canton').value,
            parroquia: this.formDireccion.get('parroquia').value,
            sector: this.formDireccion.get('sector').value,
            calleprincipal: this.formDireccion.get('calleprincipal').value,
            numeracion: this.formDireccion.get('numeracion').value,
            callesecundaria: this.formDireccion.get('callesecundaria').value,
            descripcion: this.formDireccion.get('descripcion').value,
            estado: this.formDireccion.get('estado').value,
          };
          this.direccionService.onSaveDireccion(newDireccion).subscribe(
            res => {
              console.log(res);
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
