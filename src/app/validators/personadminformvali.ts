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
            cedula: ['',
                [Validators.required, Validators.pattern('^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$'),
                Validators.minLength(10), Validators.maxLength(13)]],
            nombres: ['', [Validators.required, Validators.pattern('^[\u00F1A-Za-z _]*[\u00F1A-Za-z][\u00F1A-Za-z _]*$')]],
            apellidos: ['', [Validators.required, Validators.pattern('^[\u00F1A-Za-z _]*[\u00F1A-Za-z][\u00F1A-Za-z _]*$')]],
            fechanacimiento: ['', Validators.required],
            email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
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
