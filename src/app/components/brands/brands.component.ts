import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  public brands!: Brand[];
  currentIndex = -1

  name = '';
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 8, 10];

  constructor(private brandService: BrandService) { }

  ngOnInit(): void {
    this.retrieveStock()
  }

  public getBrands(){
    this.brandService.getBrands().subscribe(
      (response) => {
        this.brands = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  getRequestParams(name:string, page: number, pageSize: number): any {
    let params: any = {};
    if (name) {
      params[`name`] = name;
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
    const params = this.getRequestParams(this.name ,this.page, this.pageSize);

    this.brandService.getPaginationStock(params).subscribe(
      (response => {
        const {brands, totalItems} = response;
        this.brands = brands;
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

  filterByName(filterNameFrom: NgForm):void{
    this.name = filterNameFrom.value.name;
    console.log(this.name)
    this.page = 1;
    this.retrieveStock();
  }

  public deleteBrand(id: number){
    if(confirm("Delete?")){
      this.brandService.deleteBrand(id).subscribe(
        (res) => {
          console.log("DELETED!")
          this.getBrands()
        },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      )
    }
  }

}
