import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatesComponent } from './flates.component';

describe('FlatesComponent', () => {
  let component: FlatesComponent;
  let fixture: ComponentFixture<FlatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
