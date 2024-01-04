import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryslabComponent } from './salaryslab.component';

describe('SalaryslabComponent', () => {
  let component: SalaryslabComponent;
  let fixture: ComponentFixture<SalaryslabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryslabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaryslabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
