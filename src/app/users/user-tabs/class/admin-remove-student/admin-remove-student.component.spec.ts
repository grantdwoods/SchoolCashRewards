import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRemoveStudentComponent } from './admin-remove-student.component';

describe('AdminRemoveStudentComponent', () => {
  let component: AdminRemoveStudentComponent;
  let fixture: ComponentFixture<AdminRemoveStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRemoveStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRemoveStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
