import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Loginformvalid } from 'src/app/validators/loginformvalid';
import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  formLogin: FormGroup;
  token;
  id;
  constructor(
    private loginformvalid: Loginformvalid,
    private authService: AuthService,
    private router: Router) {
    this.formLogin = this.loginformvalid.formLogin;
  }

  ngOnInit() {
  }

  onSubmit(){
    if(this.formLogin.valid){
      const newLogin: Login = {
        email: this.formLogin.get('email').value.trim(),
        password: this.formLogin.get('password').value.trim(),
      };
      this.authService.onLoginIn(newLogin).subscribe(
        res => {
          console.log(res);
          this.id = res['id'];
          localStorage.setItem('id', this.id);
          this.token = res['token'];
          localStorage.setItem('token', this.token);
          this.router.navigate(['/clientCategoriaoList']);
        },
        err => {
          console.log(err);
        }
      );
    }

  }
}
