import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Sales } from 'src/app/models/sales';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-sales2',
  templateUrl: './sales2.component.html',
  styleUrls: ['./sales2.component.css']
})
export class Sales2Component implements OnInit {
  sales!:Sales[];

  constructor(private salesService: SalesService) { }

  ngOnInit(): void {
    this.getSales2();
  }

  public getSales2(){
    this.salesService.getSaless2().subscribe(
      (res: Sales[]) => {
        this.sales = res;
      },
      (error: HttpErrorResponse)=>{
        console.log(error)
      }
    )
  }

  public deleteSale(id: number){
    if(confirm("Delete?")){
      this.salesService.deleteSales2(id).subscribe(
        (res) => {
          console.log("DELETED!")
          this.getSales2();
        },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      )
    }
  }
}
