import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class Loginformvalid {
    formLogin: FormGroup;
    constructor(private formBuilder: FormBuilder) {
        this.onValidatorLogin();
    }
    onValidatorLogin() {
        this.formLogin = this.formBuilder.group({
            email: ['', Validators.required],
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
