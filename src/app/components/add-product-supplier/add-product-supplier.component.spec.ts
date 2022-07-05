import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductSupplierComponent } from './add-product-supplier.component';

describe('AddProductSupplierComponent', () => {
  let component: AddProductSupplierComponent;
  let fixture: ComponentFixture<AddProductSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductSupplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
