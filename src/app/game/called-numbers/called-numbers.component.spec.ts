import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalledNumbersComponent } from './called-numbers.component';

describe('CalledNumbersComponent', () => {
  let component: CalledNumbersComponent;
  let fixture: ComponentFixture<CalledNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalledNumbersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalledNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
