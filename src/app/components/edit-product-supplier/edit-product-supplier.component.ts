import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductSupplier } from 'src/app/models/productsupplier';
import { ProductSupplierService } from 'src/app/services/productsupplier.service';

@Component({
  selector: 'app-edit-product-supplier',
  templateUrl: './edit-product-supplier.component.html',
  styleUrls: ['./edit-product-supplier.component.css']
})
export class EditProductSupplierComponent implements OnInit {
  id!: number;
  productSupplier!: ProductSupplier;

  constructor(private productSupplierService: ProductSupplierService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })
    this.productSupplierService.getProductSupplierById(this.id).subscribe(
      (res: ProductSupplier) => {
        this.productSupplier = res
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    )
  }

  public onEditProductSupplier(editForm: NgForm){
    this.productSupplier.buyingPrice = editForm.value.buyingPrice;
    this.productSupplier.sellingPrice = editForm.value.sellingPrice;
    this.productSupplierService.updateProductSupplier(this.productSupplier).subscribe(
      (res: ProductSupplier)=>{
        console.log(res)
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    )
  }

}
