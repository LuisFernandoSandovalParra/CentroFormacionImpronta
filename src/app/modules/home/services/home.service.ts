import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from 'src/app/core/models/course.model';
import { Module } from 'src/app/core/models/module.model';
import { environment } from '../../../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly apiUrl = environment.api;
  constructor(private httpClient: HttpClient) {}

  getCoursesList(): Observable<any> {
    return this.httpClient.get<Course[]>(this.apiUrl+ '/courses/list');
  }
}
