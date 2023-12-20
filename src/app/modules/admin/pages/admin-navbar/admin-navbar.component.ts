import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent {
  activeMenu = false;
  
  constructor(private router: Router){}

  ngOnInit(): void {}

  toogleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  redirecToProfile(){
    this.router.navigate(['/'])
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
