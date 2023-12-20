import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-count-navbar',
  templateUrl: './count-navbar.component.html',
  styleUrls: ['./count-navbar.component.scss'],
})
export class CountNavbarComponent implements OnInit {
  activeMenu = false;

  constructor(private router: Router) {}

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
