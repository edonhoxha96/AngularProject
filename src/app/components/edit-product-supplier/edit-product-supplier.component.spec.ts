import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductSupplierComponent } from './edit-product-supplier.component';

describe('EditProductSupplierComponent', () => {
  let component: EditProductSupplierComponent;
  let fixture: ComponentFixture<EditProductSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProductSupplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
