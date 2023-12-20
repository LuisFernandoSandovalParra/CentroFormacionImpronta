import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesStoreComponent } from './courses-store.component';

describe('CoursesStoreComponent', () => {
  let component: CoursesStoreComponent;
  let fixture: ComponentFixture<CoursesStoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesStoreComponent]
    });
    fixture = TestBed.createComponent(CoursesStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
