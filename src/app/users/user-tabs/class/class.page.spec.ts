import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassPage } from './class.page';

describe('ClassPage', () => {
  let component: ClassPage;
  let fixture: ComponentFixture<ClassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
