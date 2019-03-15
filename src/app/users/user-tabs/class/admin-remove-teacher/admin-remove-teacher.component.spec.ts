import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRemoveTeacherComponent } from './admin-remove-teacher.component';

describe('AdminRemoveTeacherComponent', () => {
  let component: AdminRemoveTeacherComponent;
  let fixture: ComponentFixture<AdminRemoveTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRemoveTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRemoveTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
