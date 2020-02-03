import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
  })
export class Validatorsestudiante {
    docDate = 'Jun 15, 2015, 9:43:11 PM';
    form = new FormGroup({
        $key: new FormControl(null),
        cedula: new FormControl('', Validators.required),
        nombre: new FormControl('', Validators.required),
        apellido: new FormControl('', Validators.required),
        direccion: new FormControl('', Validators.required),
        genero: new FormControl('', Validators.required),
        fechaN: new FormControl('', Validators.required),
        estado: new FormControl('', Validators.required)
      });

      formControls = this.form.controls;

      initializeFomrGroup() {
        this.form.setValue({
          $key: null,
          cedula: '',
          nombre: '',
          apellido: '',
          direccion: '',
          genero: '',
          fechaN: '',
          estado: ''
        });
      }
}
