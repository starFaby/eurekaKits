import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Generalvalidunit } from './generalvalidunit';

@Injectable({
    providedIn: 'root'
})
export class Loginformvalid {
    formLogin: FormGroup;
    constructor(private formBuilder: FormBuilder, private generalvalidunit: Generalvalidunit) {
        this.onValidatorLogin();
    }
    onValidatorLogin() {
        this.formLogin = this.formBuilder.group({
            // tslint:disable-next-line:max-line-length
            email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
            password: ['', Validators.required],
        });
    }
    oninitializeFomrGroup() {
        this.formLogin.setValue({
            email: '',
            password: '',
        });
    }
}
