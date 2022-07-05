import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductSupplier } from 'src/app/models/productsupplier';
import { ProductSupplierService } from 'src/app/services/productsupplier.service';

@Component({
  selector: 'app-product-suppliers',
  templateUrl: './product-suppliers.component.html',
  styleUrls: ['./product-suppliers.component.css']
})
export class ProductSuppliersComponent implements OnInit {
  public productSuppliers!: ProductSupplier[];
  currentIndex = -1

  eurocode = '';
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [5, 10, 15];

  constructor(private productSupplierService: ProductSupplierService) { }

  ngOnInit(): void {
    this.getProductSuppliers();
  }

  public getProductSuppliers(){
    this.productSupplierService.getProductSuppliers().subscribe(
      (res: ProductSupplier[]) => {
        this.productSuppliers = res
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    )
  }

  getRequestParams(eurocode:string, page: number, pageSize: number): any {
    let params: any = {};
    if (eurocode) {
      params[`eurocode`] = eurocode;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  public retrieveStock():void {
    const params = this.getRequestParams(this.eurocode ,this.page, this.pageSize);

    this.productSupplierService.getProductSuppliersPage(params).subscribe(
      (response => {
        const {productSuppliers, totalItems} = response;
        this.productSuppliers = productSuppliers;
        this.count = totalItems;
        console.log(response);
      }),
      (error: HttpErrorResponse) =>{
        console.log(error)
      }
    )
  }
  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveStock();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveStock();
  }

  filterByEurocode(filterEurocodeFrom: NgForm):void{
    this.eurocode = filterEurocodeFrom.value.eurocode;
    console.log(this.eurocode)
    this.page = 1;
    this.retrieveStock();
  }

  public deleteProductSupplier(id: number){
    if(confirm("Are you sure you want to delete?")){
      this.productSupplierService.deleteProductSupplier(id).subscribe(
        () => {
          this.retrieveStock();
          console.log("DELETED!");
      },
        (error: HttpErrorResponse) => {
          console.log(error)
        }
      )
    }
  }

}
