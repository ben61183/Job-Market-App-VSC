import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRegisterLoginComponent } from './company-register-login.component';

describe('CompanyRegisterLoginComponent', () => {
  let component: CompanyRegisterLoginComponent;
  let fixture: ComponentFixture<CompanyRegisterLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyRegisterLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRegisterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
