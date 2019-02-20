import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClassPage } from './add-class.page';

describe('AddClassPage', () => {
  let component: AddClassPage;
  let fixture: ComponentFixture<AddClassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClassPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
