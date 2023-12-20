import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SharingDataService {
  private dataSubject = new BehaviorSubject<any>(null);
  public data$ = this.dataSubject.asObservable();

  constructor(private jwtHelper: JwtHelperService, private router: Router) {}

  setData(data: any) {
    this.dataSubject.next(data);
  }

  // Verifica si el token está expirado
  isTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  // Decodifica el token y devuelve los datos
  decodeToken(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }

  logOutSession(token: string){
    if(this.isTokenExpired(token)){
      localStorage.removeItem('token');
      this.router.navigate(['/auth/login']);
    }
  }
}
