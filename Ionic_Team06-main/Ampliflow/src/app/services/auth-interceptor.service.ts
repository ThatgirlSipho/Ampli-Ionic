import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{
  constructor(private navCtrl: NavController) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the token from localStorage
    const token = localStorage.getItem('token');

    // Clone the request and add the authorization header if token is available
    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Handle the request
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          // Handle unauthorized errors by redirecting to login
          this.navCtrl.navigateRoot('/login');
        }
        return throwError(error);
      })
    );
  }
}
