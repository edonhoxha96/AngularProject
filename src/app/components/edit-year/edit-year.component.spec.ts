import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditYearComponent } from './edit-year.component';

describe('EditYearComponent', () => {
  let component: EditYearComponent;
  let fixture: ComponentFixture<EditYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
