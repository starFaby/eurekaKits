import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class Direccionformvali {
    formDireccion: FormGroup;
    constructor(private formBuilder: FormBuilder) {
        this.onValidatorDireccion();
    }
    onValidatorDireccion() {
        this.formDireccion = this.formBuilder.group({
            iddireccion: [null],
            domisoci: ['', Validators.required],
            provincia: ['', Validators.required],
            canton: ['', Validators.required],
            parroquia: ['', Validators.required],
            sector: ['', Validators.required],
            calleprincipal: ['', Validators.required],
            numeracion: ['', Validators.required],
            callesecundaria: ['', Validators.required],
            descripcion: ['', Validators.required],
            estado: ['', Validators.required]
        });
    }
    oninitializeFomrGroup() {
        this.formDireccion.setValue({
            iddireccion: null,
            domisoci: '',
            provincia: '',
            canton: '',
            parroquia: '',
            sector: '',
            calleprincipal: '',
            numeracion: '',
            callesecundaria: '',
            descripcion: '',
            estado: ''
        });
    }
}
