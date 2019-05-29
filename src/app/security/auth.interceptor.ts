import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {LoginService} from './login/login.service';

@Injectable() // Injectable: usado quando precisamos injetar um serviço na Classe
export class AuthInterceptor implements HttpInterceptor {

  /**
   * Injector: é uma referência ao mecanismo de injeção de dependências do angular.
   * Usamos ele porque não consiguimos usar o LoginService no constructor diretamente, devido ao erro de "cyclic dependency"
   * E com o injector, conseguimos pegar qualquer instância que precisarmos
   */
  constructor(private injector: Injector) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loginService = this.injector.get(LoginService);

    if (loginService.isLoggedIn()) {
      // Precisamos clonar porque o HttpRequest é um objeto imutável, ou seja,
      // precisamos fazer uma cópia para um outra instância para realizar as alterações
      const authRequest = request.clone({setHeaders: {'Authorization': `Bearer ${loginService.user.accessToken}`}});

      return next.handle(authRequest);
    } else {
      return next.handle(request);
    }

    // let headers = new HttpHeaders();
    // if (this.loginServie.isLoggedIn()) {
    //   headers = headers.set('Authorization', `Bearer ${this.loginService.user.accessToken}`)
    // }
  }
}
