/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StudentContainerComponent } from './student-container.component';

describe('StudentContainerComponent', () => {
  let component: StudentContainerComponent;
  let fixture: ComponentFixture<StudentContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
