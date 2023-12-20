import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss'],
})
export class SigninPageComponent implements OnInit {
  private emailPattern: any =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private textPattern: any = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
  private numberPattern: any = /^-?[0-9]\d*$/;

  signInForm: FormGroup = new FormGroup({});
  errorSignIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern(this.textPattern),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern(this.textPattern),
      ]),
      documentType: new FormControl('', [Validators.required]),
      documentNum: new FormControl('', [
        Validators.required,
        Validators.pattern(this.numberPattern),
        Validators.minLength(9),
      ]),
      birthdate: new FormControl('', [
        Validators.required,
        this.minAgeValidator(18),
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(this.numberPattern),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      academicLevel: new FormControl('', [Validators.required]),
      profession: new FormControl('', [
        Validators.required,
        Validators.pattern(this.textPattern),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  minAgeValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value) {
        const selectedDate = new Date(this.signInForm.value.birthdate);
        const today = new Date();
        const age = today.getFullYear() - selectedDate.getFullYear();

        if (age < minAge) {
          return { minimunAge: true };
        }
      }

      return null;
    };
  }

  sendRegister() {
    const {
      firstName,
      lastName,
      birthdate,
      documentType,
      documentNum,
      phoneNumber,
      academicLevel,
      profession,
      email,
      password,
    } = this.signInForm.value;
    if(this.signInForm.valid){
      this.authService
      .sendInfoRegister(
        firstName,
        lastName,
        birthdate,
        documentType,
        documentNum,
        phoneNumber,
        email,
        academicLevel,
        profession
      )
      .subscribe({
        next: (response) =>{
          if(response.ok === true){
            this.authService.sendCredentialRegister(response.info.user_id, password).subscribe({
              next: (internResponse) => {
                if(internResponse.ok === true){
                  console.log("se creo correctamente el usuario.")
                  this.router.navigate(['/auth/login'])
                }else{
                  console.log("Falló el registro de credenciales.")
                }
              },
              error: (error) => {
                console.log("Falló el registro de credenciales. #2", error)
              }
            })
          }else{
            console.log("Fallo el registro de datos.")
          }
        },
        error: (Error) => {
          console.log("este fue el error", Error)
          console.log("Fallo el registro de datos. #2", Error)
        }
      });
    }else{
      console.log("El formulario es invalido")
    }
  }

  get firstName() {
    return this.signInForm.get('firstName');
  }

  get lastName() {
    return this.signInForm.get('lastName');
  }

  get documenType(){
    return this.signInForm.get('documentType');
  }

  get documentNum() {
    return this.signInForm.get('documentNum');
  }

  get birthdate() {
    return this.signInForm.get('birthdate');
  }

  get phoneNumber() {
    return this.signInForm.get('phoneNumber');
  }

  get academicLevel() {
    return this.signInForm.get('academicLevel');
  }

  get profession() {
    return this.signInForm.get('profession');
  }

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }
}
