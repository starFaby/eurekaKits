import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Injectable({
    providedIn: 'root'
})
export class Personaformvali {
    formPersona: FormGroup;
    constructor(private formBuilder: FormBuilder){
        this.onValidatorProducto();
    }
    onValidatorProducto(){
        this.formPersona = this.formBuilder.group({
            idpersona: [null],
            idtelefono: ['', Validators.required],
            iddireccion: ['', Validators.required],
            cedula: ['', Validators.required],
            nombres: ['', Validators.required],
            apellidos: ['', Validators.required],
            fechanacimiento: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            requerimiento: ['', Validators.required],
            estado: ['', Validators.required],
        });
    }
    oninitializeFomrGroup() {
        this.formPersona.setValue({
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
