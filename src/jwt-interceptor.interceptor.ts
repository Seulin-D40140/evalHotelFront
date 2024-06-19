import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} 
from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtTokenService } from './app/services/jwt-token.service';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

    constructor(private authService : JwtTokenService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = this.authService.getToken();
    if(jwtToken){
        request = request.clone({
        headers : request.headers.set('Authorization', "Bearer " + JSON.parse(jwtToken))
        })
    }
    return next.handle(request);
    }
}