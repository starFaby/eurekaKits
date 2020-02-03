import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
  })
export class Validatorsgeneral {
    form = new FormGroup({
        $key: new FormControl(null),
        idEstudiante: new FormControl('', Validators.required),
        cedula: new FormControl('', Validators.required),
        grupoSanguineo: new FormControl('', Validators.required),
        antecedentes: new FormControl('', Validators.required),
        motivoConsulta: new FormControl('', Validators.required),
        enfermedadActual: new FormControl('', Validators.required),
        presion: new FormControl('', Validators.required),
        temperatura: new FormControl('', Validators.required),
        saturacionOxigeno: new FormControl('', Validators.required),
        peso: new FormControl('', Validators.required),
        talla: new FormControl('', Validators.required),
        examenFisico: new FormControl('', Validators.required),
        idCie10: new FormControl('', Validators.required),
        codigo: new FormControl('', Validators.required),
        descripcion: new FormControl('', Validators.required),
        tratamiento: new FormControl('', Validators.required),
        seguimiento: new FormControl('', Validators.required),
        observaciones: new FormControl('', Validators.required),
        estado: new FormControl('', Validators.required),

      });
      formControls = this.form.controls;
      initializeFomrGroup() {
        this.form.setValue({
          $key: null,
          idEstudiante: '',
          cedula: '',
          grupoSanguineo: '',
          antecedentes: '',
          motivoConsulta: '',
          enfermedadActual: '',
          presion: '',
          temperatura: '',
          saturacionOxigeno: '',
          peso: '',
          talla: '',
          examenFisico: '',
          idCie10: '',
          codigo: '',
          descripcion: '',
          tratamiento: '',
          seguimiento: '',
          observaciones: '',
          estado: ''
        });
      }
}
