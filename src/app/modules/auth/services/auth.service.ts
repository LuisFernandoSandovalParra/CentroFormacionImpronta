import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly URL = environment.api;
  constructor(private http: HttpClient) {}

  sendCredentials(email: string, password: string): Observable<any> {
    const body = {
      email,
      password,
    };
    return this.http.post(`${this.URL}/users/auth/login`, body);
  }

  sendInfoRegister(
    name: string,
    last_name: string,
    birthdate: string,
    document_type: string,
    document_number: number,
    phone_number: string,
    email: string,
    academy_level: string,
    profession: string
  ): Observable<any> {
    const body = {
      name,
      last_name,
      birthdate,
      document_type,
      document_number,
      phone_number,
      email,
      academy_level,
      profession,
    };
    return this.http.post(`${this.URL}/users/auth/register`, body);
  }

  sendCredentialRegister(user_id: number, password: string): Observable<any> {
    const body = {
      user_id,
      password,
    };
    return this.http.post(`${this.URL}/credentials/register`, body);
  }
}
