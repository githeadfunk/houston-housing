import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsIndexComponent } from './charts-index.component';

describe('ChartsIndexComponent', () => {
  let component: ChartsIndexComponent;
  let fixture: ComponentFixture<ChartsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
