import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCourseDetailComponent } from './modal-course-detail.component';

describe('ModalCourseDetailComponent', () => {
  let component: ModalCourseDetailComponent;
  let fixture: ComponentFixture<ModalCourseDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCourseDetailComponent]
    });
    fixture = TestBed.createComponent(ModalCourseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
