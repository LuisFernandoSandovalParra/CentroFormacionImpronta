import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePaymentFormComponent } from './course-payment-form.component';

describe('CoursePaymentFormComponent', () => {
  let component: CoursePaymentFormComponent;
  let fixture: ComponentFixture<CoursePaymentFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursePaymentFormComponent]
    });
    fixture = TestBed.createComponent(CoursePaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
