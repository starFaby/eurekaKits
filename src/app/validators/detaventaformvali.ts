import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class Detaventaformvali {
    formDetaVenta: FormGroup;
    constructor(private formBuilder: FormBuilder) {
        this.onValidatorDetaVenta();
    }
    onValidatorDetaVenta() {
        this.formDetaVenta = this.formBuilder.group({
            iddetalleventa: [null],
            idfactura: ['', Validators.required],
            idproducto: ['', Validators.required],
            cantidad: ['', Validators.required],
            precio: ['', Validators.required],
            total: ['', Validators.required],
            estado: ['', Validators.required]
        });
    }
    oninitializeFomrGroup() {
        this.formDetaVenta.setValue({
            iddetalleventa: null,
            idfactura: '',
            idproducto: '',
            cantidad: '',
            precio: '',
            total: '',
            estado: ''
        });
    }
}
