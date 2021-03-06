import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCallComponent } from './patient-call.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FormBuilder } from '@angular/forms';

describe('PatientCallComponent', () => {
  let component: PatientCallComponent;
  let fixture: ComponentFixture<PatientCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ PatientCallComponent ],
      providers: [ FormBuilder ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
