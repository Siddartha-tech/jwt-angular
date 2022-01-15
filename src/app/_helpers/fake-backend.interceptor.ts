import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';
import { User } from '@app/_models/user';

// array in local storage for registered users
const usersKey: string = 'angular-10-registration-login-example-users';
let userInfo = localStorage.getItem(usersKey);
let users: User[] = userInfo ? JSON.parse(userInfo) : [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const { url, method, headers, body } = request;

    return handleRoute();

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }

    }

    function authenticate() {
      const username = body;
      const password = body;
      const user = users.find(x => x.username === username && x.password === password);
      if (!user) return error('Username or password is incorrect');
      return ok({
        ...basicDetails(user),
        token: 'fake-jwt-token'
      })
    }

    // helper functions

    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body }))
        .pipe(delay(500)); // delay observable to simulate server api call
    }

    function error(message: any) {
      //return throw new Error("");
       return throwError({ error: { message } })
        .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
    }

    function basicDetails(user: User) {
      const { id, username, firstName, lastName } = user;
      return { id, username, firstName, lastName };
    }

  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};