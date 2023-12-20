import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SharingDataService } from 'src/app/sharing-services/sharing-data.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  token: any;
  userData: any;

  private emailPattern: any =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  errorSession: boolean = false;
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private authService: AuthService,
    private sharingService: SharingDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    /*
    this.token = localStorage.getItem('token');
    if (this.token) {
      // Verifica si el token está expirado
      const isTokenExpired = this.authService.isTokenExpired(this.token);

      if (!isTokenExpired) {
        // Decodifica el token y obtiene los datos
        this.userData = this.authService.decodeToken(this.token);
      } else {
        // El token está expirado, realiza la acción necesaria (por ejemplo, cerrar sesión)
        console.log('El token está expirado');
      }
    } else {
      // El token no está presente, realiza la acción necesaria (por ejemplo, redirigir al inicio de sesión)
      console.log('Token no encontrado');
    }
    */
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  sendLogin(): void {
    const { email, password } = this.loginForm.value;
    this.authService.sendCredentials(email, password).subscribe({
      next: (responseOk) => {
        const { token } = responseOk;
        localStorage.setItem('token', token);
        this.userData = this.sharingService.decodeToken(this.token);
        if(this.userData.user.rol === 1){
          this.router.navigate(['/admin/home']);
        }else{
          this.router.navigate(['/my-count/my-courses']);
        }
      },
      error: (error) => {
        this.errorSession = true;
      },
    });
  }
}
