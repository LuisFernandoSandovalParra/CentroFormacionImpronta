import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharingDataService } from 'src/app/sharing-services/sharing-data.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent {
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
