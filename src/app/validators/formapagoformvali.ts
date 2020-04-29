import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class Formapagoformvali {
    formFormPago: FormGroup;
    constructor(private formBuilder: FormBuilder) {
        this.onValidatorFormPago();
    }
    onValidatorFormPago() {
        this.formFormPago = this.formBuilder.group({
            idformapago: [null],
            idfactura: ['', Validators.required],
            idtipopago: ['', Validators.required],
            estado: ['', Validators.required]
        });
    }
    oninitializeFomrGroup() {
        this.formFormPago.setValue({
            idformapago: null,
            idfactura: '',
            idtipopago: '',
            estado: ''
        });
    }
}
