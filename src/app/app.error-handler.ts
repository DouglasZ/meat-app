import {HttpErrorResponse} from '@angular/common/http';
import {ErrorHandler, Injectable, Injector, NgZone} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import {NotificationService} from './shared/messages/notification.service';
import {LoginService} from './security/login/login.service';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

  constructor(private ns: NotificationService,
              private injector: Injector,
              private zone: NgZone) {
    super(); // Precisou para que continue chamando o construtor padrão do ErrorHandler
  }

  handleError(errorResponse: HttpErrorResponse | any) {
    if (errorResponse instanceof HttpErrorResponse) {
      const message = errorResponse.error.message;
      // NgZone, foi preciso para que a animação da notificação funcionasse corretamente.
      // Pois o angular estava ignorando as animações pela fato de estar fora desta "zona", ou seja,
      // acabava ignorando as alterações que o componente sofria
      // Isso vale para qualquer componente. Se caso alguma mudança em alguma propriedade deveria ter refletido na tela,
      // mas não foi, provavel que ele esteja executando fora de uma zona
      this.zone.run(() => {
        switch (errorResponse.status) {
          case 401:
            this.injector.get(LoginService).handleLogin();
            break;
          case 403:
            this.ns.notify(message || 'Não autorizado.');
            break;
          case 404:
            this.ns.notify(message || 'Recurso não encontrado. Verifique o console para mais detalhes.');
            break;
        }
      });
    }
    super.handleError(errorResponse);
  }
}
