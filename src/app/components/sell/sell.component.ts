import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Costumer } from '../../models/costumer';
import { Sales } from '../../models/sales';
import { Stock } from '../../models/stock';
import { CostumerService } from '../../services/costumer.service';
import { SalesService } from '../../services/sales.service';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  public id!: number;
  public stock!: Stock;
  public costumers!: Costumer[];
  public selectedCostumer!: Costumer;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stockService: StockService,
    private salesService: SalesService,
    private costumerService: CostumerService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
    console.log(this.id);
    this.stockService.getStockById(this.id).subscribe(
      (response: Stock) => {
        this.stock = response;
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    )
    this.getCostumers();
  }

  public getCostumers():void {
    this.costumerService.getCostumers().subscribe(
      (response: Costumer[]) => {
        this.costumers = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
      )
    
  }

  public sellProd(sellForm: NgForm):void{
    console.log(this.stock.quantity)
    if(sellForm.value.quantity < 0 || sellForm.value.quantity > this.stock.quantity){
      alert("Selling quantity can't be negative or higher than "+ this.stock.quantity)
      return
    }
    if(sellForm.value.price < 0){
      alert("Selling quantity can't be negative!")
      return
    }
    var price;
    console.log(sellForm.value.price)
    if(sellForm.value.price){
      price = sellForm.value.price
    }else{
      price = this.stock.productSupplier.sellingPrice
    }
    
    let sale:Sales = {
      id:0,
      quantity: sellForm.value.quantity,
      sellingPrice: price,
      depot: this.stock.depot,
      sector: this.stock.sector,
      productSupplier: this.stock.productSupplier,
      costumer: {
        id: sellForm.value.costumer
      },
      created: new Date(),
      updated: new Date(),
    } 
    console.log('created: ' + sale.created + ', updated: ' + sale.updated)
    this.salesService.addSales(sale).subscribe(
      (response: Sales) => {
        console.log(this.stock.quantity);
        this.stock.quantity -= sellForm.value.quantity
        console.log(this.stock.quantity);
        this.stockService.updateStock(this.stock).subscribe(
          (response: Stock) => {
            console.log(response);
          },
          (error: HttpErrorResponse) => {
            console.log(error.message)
          }
        )
        this.salesService.addSales2(sale).subscribe()
        this.router.navigate(['/sales']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }
}
