import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardModalPage } from './award-modal.page';

describe('AwardModalPage', () => {
  let component: AwardModalPage;
  let fixture: ComponentFixture<AwardModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwardModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
