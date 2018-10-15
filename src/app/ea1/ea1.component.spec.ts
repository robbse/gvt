import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ea1Component } from './ea1.component';

describe('Ea1Component', () => {
  let component: Ea1Component;
  let fixture: ComponentFixture<Ea1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ea1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ea1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
