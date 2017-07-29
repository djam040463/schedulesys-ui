import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTestComponent } from './employee-test.component';

describe('EmployeeTestComponent', () => {
  let component: EmployeeTestComponent;
  let fixture: ComponentFixture<EmployeeTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
