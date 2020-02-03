import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })
export class Validatorscie10 {
    form = new FormGroup({
        $key: new FormControl(null),
        codigo: new FormControl('', Validators.required),
        descripcion: new FormControl('', Validators.required),
        estado: new FormControl('', Validators.required)
      });

      formControls = this.form.controls;

      initializeFomrGroup() {
        this.form.setValue({
          $key: null,
          codigo: '',
          descripcion: '',
          estado: ''
        });
      }
}
