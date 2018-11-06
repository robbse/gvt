import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ea3Component } from './ea3.component';

describe('Ea3Component', () => {
  let component: Ea3Component;
  let fixture: ComponentFixture<Ea3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ea3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ea3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
