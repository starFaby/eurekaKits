import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Loginformvalid } from 'src/app/validators/loginformvalid';
import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import jwt from 'jwt-decode';
import { Generalvalidunit } from 'src/app/validators/generalvalidunit';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  formLogin: FormGroup;
  token;
  constructor(
    private loginformvalid: Loginformvalid,
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService) {
    this.formLogin = this.loginformvalid.formLogin;
  }
  ngOnInit() {
  }
  onSubmit() {
    if (this.formLogin.valid) {
      const newLogin: Login = {
        email: this.formLogin.get('email').value,
        password: this.formLogin.get('password').value,
      };
      this.authService.onLoginIn(newLogin).subscribe(
        res => {
          console.log('===> ', res);
          // tslint:disable-next-line:no-string-literal
          this.token = res['token'];
          localStorage.setItem('idpersona', this.onGetIdPersona(this.token));
          localStorage.setItem('token', this.token);
          this.router.navigate(['/clientCategoriaoList']);
          this.toast.success('Bienvenido', 'logeado Correctamente', {
            timeOut: 3000
          });
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 0) {
              this.toast.error('Error', 'Servidor Caido: Consulte con el administrador', {
                timeOut: 3000
              });
            } else if (err.status === 401) {
              this.toast.error('Error', 'Usuario no Encontrado', {
                timeOut: 3000
              });
            } else if (err.status === 409) {
              this.toast.error('Error', 'Password Incorrecto', {
                timeOut: 3000
              });
            } else if (err.status === 404) {
              this.toast.error('Error', 'Usuario No encontrado', {
                timeOut: 3000
              });
            }

          }
        }
      );
    }
  }
  onGetIdPersona(idpersona: string) {
    const aux = jwt(idpersona);
    const newIdPersona = aux.subject;
    return newIdPersona;
  }
}
