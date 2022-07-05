import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductSupplier } from 'src/app/models/productsupplier';
import { Supplier } from 'src/app/models/supplier';
import { ProductService } from 'src/app/services/product.service';
import { ProductSupplierService } from 'src/app/services/productsupplier.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-add-product-supplier',
  templateUrl: './add-product-supplier.component.html',
  styleUrls: ['./add-product-supplier.component.css']
})
export class AddProductSupplierComponent implements OnInit {
  public products!: Product[];
  public selectedProduct!: Product;
  public suppliers!: Supplier[];
  public selectedSupplier!: Supplier;
  public message!: string;
  public errorMessage!: string;

  constructor(
    private productService: ProductService,
    private supplierService: SupplierService,
    private productSupplierService: ProductSupplierService,
  ) { }

  ngOnInit(): void {
    this.getProducts()
    this.getSuppliers()
  }

  public getProducts(){
    this.productService.getProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
public getSuppliers():void{
  this.supplierService.getSuppliers().subscribe(
    (response: Supplier[]) => {
      this.suppliers= response;
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  )
}

public onAddProductSupplier(addProductSupplier: NgForm):void{
    console.log(this.suppliers.find(s => s.id == addProductSupplier.value.supplier))
    let supp = this.suppliers.find(s => s.id == addProductSupplier.value.supplier);
    let prod = this.products.find(p => p.id == addProductSupplier.value.product);
    let ps: ProductSupplier= {
      id: 0,
      buyingPrice: addProductSupplier.value.buyingPrice,
      sellingPrice: addProductSupplier.value.sellingPrice,
      product: prod!,
      supplier: supp!
    }
    this.productSupplierService.addProductSupplier(ps).subscribe(
      (response: ProductSupplier) => {
        console.log(response)
        this.message = "Saved!"
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error.message; 
      }
    )
  }
}
