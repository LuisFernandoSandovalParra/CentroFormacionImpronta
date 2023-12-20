import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharingDataService } from 'src/app/sharing-services/sharing-data.service';
import { AdminService } from '../../services/admin.service';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';

@Component({
  selector: 'app-admin-profile-edit',
  templateUrl: './admin-profile-edit.component.html',
  styleUrls: ['./admin-profile-edit.component.scss'],
})
export class AdminProfileEditComponent {
  private emailPattern: any =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private textPattern: any = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
  private numberPattern: any = /^-?[0-9]\d*$/;

  token: any;
  userDocument: number = 0;
  userData: any;
  profileForm: FormGroup = new FormGroup({});
  errorSignIn: boolean = false;

  constructor(
    private router: Router,
    private sharingService: SharingDataService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.profileForm = new FormGroup({
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
    });
    this.token = localStorage.getItem('token');
    this.userDocument = this.sharingService.decodeToken(
      this.token
    ).user.document_number;
    this.adminService.getInfoUser(this.userDocument).subscribe({
      next: (response) => {
        this.profileForm.setValue({
          firstName: response.info.name,
          lastName: response.info.last_name,
          documentType: response.info.document_type,
          documentNum: response.info.document_number,
          birthdate: response.info.birthdate,
          phoneNumber: response.info.phone_number,
          academicLevel: response.info.academy_level,
          profession: response.info.profession,
          email: response.info.email,
        });
        this.profileForm.get('documentType')?.disable();
        this.profileForm.get('documentNum')?.disable();
        this.profileForm.get('email')?.disable();
      },
    });
  }

  minAgeValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value) {
        const selectedDate = new Date(this.profileForm.value.birthdate);
        const today = new Date();
        const age = today.getFullYear() - selectedDate.getFullYear();
        if (age < minAge) {
          return { minimunAge: true };
        }
      }

      return null;
    };
  }

  sendEditedInformation() {
    const {
      firstName,
      lastName,
      birthdate,
      phoneNumber,
      academicLevel,
      profession,
    } = this.profileForm.value;
    if (this.profileForm.valid) {
      this.adminService
        .updateUserInfo(
          firstName,
          lastName,
          birthdate,
          this.userDocument,
          phoneNumber,
          academicLevel,
          profession
        )
        .subscribe({
          next: (response) => {
            this.router.navigate(['/my-count/my-courses']);
          },
          error: (error) => {
            console.log(
              'Ha ocurrido un error al modificar la información',
              error
            );
          },
        });
    } else {
      console.log('Complete los espacios correctamente');
    }
  }

  get firstName() {
    return this.profileForm.get('firstName');
  }

  get lastName() {
    return this.profileForm.get('lastName');
  }

  get documenType() {
    return this.profileForm.get('documentType');
  }

  get documentNum() {
    return this.profileForm.get('documentNum');
  }

  get birthdate() {
    return this.profileForm.get('birthdate');
  }

  get phoneNumber() {
    return this.profileForm.get('phoneNumber');
  }

  get academicLevel() {
    return this.profileForm.get('academicLevel');
  }

  get profession() {
    return this.profileForm.get('profession');
  }

  get email() {
    return this.profileForm.get('email');
  }
}
