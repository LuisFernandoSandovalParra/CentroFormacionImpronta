import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environments';
import { Course } from 'src/app/core/models/course.model';
import { FormControl, FormGroup } from '@angular/forms';
import { SharingDataService } from 'src/app/sharing-services/sharing-data.service';
import { CountService } from '../../services/count.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-payment-form',
  templateUrl: './course-payment-form.component.html',
  styleUrls: ['./course-payment-form.component.scss'],
})
export class CoursePaymentFormComponent implements OnInit {

  paymentForm: FormGroup = new FormGroup({});
  private selectDataSubscription: Subscription;
  currency: string = 'COP';
  reference: string = '';
  integrity: string = '';
  publicKey = environment.publicKey;
  redirectLink: string = 'http:localhost:4200/inicio';

  courses: Course[] = [];
  currentCourse: Course = {
    id: 0,
    name: '',
    image: '',
    course_type: '',
    substantive_function: '',
    hours_num: 0,
    value: 0,
  };

  constructor(
    private sharingDataService: SharingDataService,
    private countService: CountService
  ) {
    this.selectDataSubscription = this.sharingDataService.data$.subscribe({
      next: (data) => {
        this.currentCourse = data.course;
        console.log(this.currentCourse)
      },
      error: (error) =>{
        console.log("error: ", error)
      }
    }
    );
  }
  ngOnInit(): void {
    this.countService.getAllCourses().subscribe((data) => {
      for (let i = 0; i < data.info.length; i++) {
        this.currentCourse = {
          id: data.info[i].course_id,
          image: data.info[i].url_image,
          name: data.info[i].name,
          course_type: data.info[i].course_type,
          substantive_function: data.info[i].substantive_function,
          hours_num: data.info[i].hours_number,
          value: data.info[i].value,
        };
        this.courses.push(this.currentCourse);
      }
    });
    this.paymentForm = new FormGroup({
      fullName: new FormControl(''),
      email: new FormControl(''),
      documentType: new FormControl(''),
      documentNum: new FormControl(''),
      phoneNumber: new FormControl(''),
      courseSelected: new FormControl(''),
      amountInCents: new FormControl(''),

    })
  }

  ngOnDestroy() {
    this.selectDataSubscription.unsubscribe();
  }

  get fullName(){
    return this.paymentForm.get('fullName');
  }

  get email(){
    return this.paymentForm.get('email');
  }

  get documentType(){
    return this.paymentForm.get('documentType');
  }

  get documentNum(){
    return this.paymentForm.get('documentNum');
  }

  get phoneNumber(){
    return this.paymentForm.get('phoneNumber');
  }

  get courseSelected(){
    return this.paymentForm.get('courseSelected');
  }

  get amountInCents(){
    return this.paymentForm.get('amountInCents')
  }


  formatCentCop(amount: string) {
    const cantidadNumerica = amount.replace(/[^0-9.]/g, '');
    const cantidadCentavosCOP = parseFloat(cantidadNumerica) * 100;
    return cantidadCentavosCOP.toString();
  }

  getIntegrityFirm() {
    this.amountInCents?.setValue(this.formatCentCop(this.amountInCents?.value));
    this.countService.getIntegrity(this.amountInCents?.value).subscribe((data) => {
      this.reference = data.reference;
      this.integrity = data.result;
      const url = 'https://checkout.wompi.co/p/';
      const queryParams = `?public-key=${this.publicKey}&currency=${this.currency}&amount-in-cents=${this.amountInCents}&reference=${this.reference}&signature:integrity=${this.integrity}&redirect-url=${this.redirectLink}&customer-data:email=${this.email}&customer-data:full-name=${this.fullName}&customer-data:phone-number=${this.phoneNumber}&customer-data:legal-id=${this.documentNum}&customer-data:legal-id-type=${this.documentType}`;
      window.location.href = url + queryParams;
    });
  }
}
