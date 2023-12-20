import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountNavbarComponent } from './count-navbar.component';

describe('CountNavbarComponent', () => {
  let component: CountNavbarComponent;
  let fixture: ComponentFixture<CountNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountNavbarComponent]
    });
    fixture = TestBed.createComponent(CountNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
