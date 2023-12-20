import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharingDataService } from 'src/app/sharing-services/sharing-data.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss'],
})
export class MyCoursesComponent implements OnInit {
  token: any;
  userData: any;

  constructor(
    private router: Router,
    private sharingService: SharingDataService
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.userData = this.sharingService.decodeToken(this.token);
    if (this.sharingService.isTokenExpired(this.token)) {
      localStorage.removeItem('token');
      this.router.navigate(['/auth/login']);
    }
  }
}
