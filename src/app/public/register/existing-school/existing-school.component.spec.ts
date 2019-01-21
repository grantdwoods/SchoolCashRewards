import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingSchoolComponent } from './existing-school.component';

describe('ExistingSchoolComponent', () => {
  let component: ExistingSchoolComponent;
  let fixture: ComponentFixture<ExistingSchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingSchoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
