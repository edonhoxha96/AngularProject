import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { SalesPageData } from 'src/app/models/sales-page-data';
import { Sales } from '../../models/sales';
import { SalesService } from '../../services/sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  public filteredSales!: Sales[];
  public sales!: Sales[];
  pageSales: Sales[] = []
  total:number = 0;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  currentIndex = -1;
  count = 0;
  pageSizes = [10, 15, 20];
  data:any ={
    done: true,
    page: 1,
    pageSize: 10,
    start: '',
    end: ''
  }

  constructor(
    private salesService: SalesService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    let today = new Date()
    let today1 = new Date()
    this.range.controls["start"].setValue(today)
    this.range.controls["end"].setValue(today1)
    console.log(this.range.value.start)
    console.log(this.range.value.end)
    this.filterDate()
  }



  public getSales():void{
    const datePipe: DatePipe = new DatePipe('en-US')
    let formattedDate = datePipe.transform(this.range.value.start, 'YYYY-MM-ddTHH:mm:ss.SSSSSSS')
    let formattedEndDate = datePipe.transform(this.range.value.end, 'YYYY-MM-ddTHH:mm:ss.SSSSSSS')
    let params:any = {};
    params['startDate'] = formattedDate
    params['endDate'] = formattedEndDate
    this.salesService.getSalesByDate(params).subscribe(
      (response: Sales[]) => {
        console.log(response)
        
        // this.filterDate();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        if(error.status == 401){
          alert("UNAUTHORIZED!!");
          this.router.navigate(['/login']);
        }
        //alert(error.message)
      }
    )
  }

  public retrieveSales():void{
    
    const params = this.getRequestParams(this.data.done, this.data.page, this.data.pageSize, this.data.start, this.data.end)
    this.salesService.getPaginationSales(params).subscribe(
    (response) => {
      const {sales, totalItems} = response
      this.pageSales = sales;
      console.log(response)
      this.count = totalItems;
      this.calculateTotal()
    },
    (error: HttpErrorResponse) => {
      alert(error.message)
    }

    )
  }

  getRequestParams(done: boolean, page: number, pageSize: number, startDate: string, endDate: string): any {
    let params: any = {};
    if(startDate){
      params[`startDate`] = startDate;
    }
    if(endDate){
      params[`endDate`] = endDate;
    }endDate
    if(done){
      params[`done`] = done
    }
    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  handlePageChange(event: number): void {
    this.data.page = event;
    this.retrieveSales();
  }

  handlePageSizeChange(event: any): void {
    this.data.pageSize = event.target.value;
    this.data.page = 1;
    this.retrieveSales();
  }

  public filterDate():void{
    this.range.value.start.setHours(0,0,0)
    var today = new Date()

    if((today.getFullYear() === this.range.value.end.getFullYear() && today.getMonth() === this.range.value.end.getMonth() && today.getDate() === this.range.value.end.getDate())){
      this.range.value.end.setHours(today.getHours(), today.getMinutes(), today.getSeconds());
    }else{
      this.range.value.end.setHours(23,59,59);
    }
    const datePipe: DatePipe = new DatePipe('en-US')
    let formattedDate = datePipe.transform(this.range.value.start, 'YYYY-MM-ddTHH:mm:ss.SSSSSSS')
    let formattedEndDate = datePipe.transform(this.range.value.end, 'YYYY-MM-ddTHH:mm:ss.SSSSSSS')
    console.log(formattedDate)
    console.log(formattedEndDate)
    this.data.start = formattedDate
    this.data.end = formattedEndDate

    
    
    // let startDate = new Date(this.range.value.start.getDay(), this.range.value.start.getMonth(), this.range.value.start.getFullYear())
    // console.log(startDate)
    //this.getSales()
    this.retrieveSales()
  }

  public calculateTotal():void{
    this.total = 0;
    this.pageSales.forEach(fs => {
      this.total += fs.sellingPrice * fs.quantity;
    })
  }
}
