import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { HttpHeaders } from '@angular/common/http';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpInterceptorService implements HttpInterceptor {
  constructor(private _authService: AuthService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this._authService.getAccessToken();
    let modifiedReq = req.clone({ 
      headers: req.headers.set('Authorization', `JWT ${accessToken}`),
    });
    modifiedReq.headers.append('Access-Control-Allow-Origin', '*');
    modifiedReq.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    modifiedReq.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    return next.handle(modifiedReq);
  }

}