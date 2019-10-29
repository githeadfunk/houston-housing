import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsByMonthComponent } from './charts-by-month.component';

describe('ChartsByMonthComponent', () => {
  let component: ChartsByMonthComponent;
  let fixture: ComponentFixture<ChartsByMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsByMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
