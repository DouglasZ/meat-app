import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NavigationEnd, Router} from '@angular/router';

import {Observable} from 'rxjs';
import {tap, filter} from 'rxjs/operators';

import {MEAT_API} from '../../app.api';
import {User} from './user.model';

@Injectable()
export class LoginService {

  user: User;
  lastUrl: string;

  constructor(private http: HttpClient,
              private router: Router) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => this.lastUrl = e.url);
  }

  isLoggedIn(): boolean {
    return this.user !== undefined;
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${MEAT_API}/login`, {email: email, password: password})
                    .pipe(tap(user => this.user = user))
  }

  logout() {
    this.user = undefined;
  }

  handleLogin(path: string = this.lastUrl) { // Caso não for passado paremetro, pega a última URL que parou na página
    this.router.navigate(['/login', btoa(path)]); // btoa = Faz o encoding do path de %2Forder -> /order
  }
}
