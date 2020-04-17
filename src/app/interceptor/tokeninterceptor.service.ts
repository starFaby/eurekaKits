import { Injectable, Injector } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokeninterceptorService {
  constructor(private injector: Injector) { }
  intercept(req, next) {
    const signinService = this.injector.get(AuthService);
    const tokenizedREq = req.clone({
      setHeaders: {
        authorization: `Bearer ${signinService.onGetToken()}`
      }
    });
    return next.handle(tokenizedREq);
  }
}
