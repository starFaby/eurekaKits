import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Injectable({
    providedIn: 'root'
})
export class Personadminformvali {
    formPersonaAdmin: FormGroup;
    constructor(private formBuilder: FormBuilder) {
        this.onValidatorProducto();
    }
    onValidatorProducto() {
        this.formPersonaAdmin = this.formBuilder.group({
            idpersona: [null],
            idtelefono: ['', Validators.required],
            iddireccion: ['', Validators.required],
            cedula: ['', Validators.required],
            nombres: ['', Validators.required],
            apellidos: ['', Validators.required],
            fechanacimiento: ['', Validators.required],
            email: ['', Validators.required, Validators.pattern('[^@]*@[^@]*')],
            password: ['', Validators.required],
            requerimiento: ['', Validators.required],
            estado: ['', Validators.required],
        });
    }
    oninitializeFomrGroup() {
        this.formPersonaAdmin.setValue({
            idpersona: null,
            idtelefono: '',
            iddireccion: '',
            cedula: '',
            nombres: '',
            apellidos: '',
            fechanacimiento: '',
            email: '',
            password: '',
            requerimiento: '',
            estado: '',
        });
    }
}
