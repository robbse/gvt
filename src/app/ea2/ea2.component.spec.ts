import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ea2Component } from './ea2.component';

describe('Ea2Component', () => {
  let component: Ea2Component;
  let fixture: ComponentFixture<Ea2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ea2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ea2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
