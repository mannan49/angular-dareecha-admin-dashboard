import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const token = localStorage.getItem('access_token') ;
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODIwZTU3Y2MxNGZiZjE4YTBmNjExYTciLCJyb2xlIjoidXNlciIsIm5hbWUiOiJVbWVyIEhhZmVleiIsImVtYWlsIjoibWFsaWt1bWVyaGFmZWV6QGdtYWlsLmNvbSIsImlhdCI6MTc0NzQ4MzU4MiwiZXhwIjoxNzQ4MDg4MzgyfQ.r9sbBRoIDumfsmNzXz6JsxXWy4dRuiFCSJeUHW_Lj-I';
    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
