import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly apiUrl = environment.api;
  constructor(private httpClient: HttpClient) {}

  getInfoUser(documentNum: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.httpClient.get<any>(
      this.apiUrl + `/users/search_user/${documentNum}`,
      { headers }
    );
  }

  updateUserInfo(
    name: string,
    last_name: string,
    birthdate: string,
    document_number: number,
    phone_number: string,
    academy_level: string,
    profession: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    const body = {
      name,
      last_name,
      birthdate,
      phone_number,
      academy_level,
      profession,
    };
    return this.httpClient.put(
      `${this.apiUrl}/users/edit/${document_number}`,
      body,
      {
        headers,
      }
    );
  }

  getAllUsers(): Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.httpClient.get<any>(this.apiUrl+'/users/list', {headers})
  }
}
