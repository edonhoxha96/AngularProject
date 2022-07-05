import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Depot } from '../../models/depot';
import { Sector } from '../../models/sector';
import { Stock } from '../../models/stock';
import { DepotService } from '../../services/depot.service';
import { SectorService } from '../../services/sector.service';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-move',
  templateUrl: './move.component.html',
  styleUrls: ['./move.component.css']
})
export class MoveComponent implements OnInit {
  public id!: number;
  public stock!: Stock;
  public sectors!: Sector[];
  public depots!: Depot[];
  public selectedDepot!: Depot;
  public selectedSector!: Sector;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stockService: StockService,
    private depotService: DepotService,
    private sectorService: SectorService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
    this.stockService.getStockById(this.id).subscribe(
      (response: Stock) => {
        this.stock = response;
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
    console.log(this.id);
    //this.getStockById();
    this.getDepots();
    this.getSectors();
  }

  public getStockById():void{
    this.stockService.getStockById(this.id).subscribe(
      (response: Stock) => {
        this.stock = response;
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getSectors(): void {
    this.sectorService.getSectors().subscribe(
      (response: Sector[]) => {
        this.sectors = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getDepots(): void {
    this.depotService.getDepots().subscribe(
      (response: Depot[]) => {
        this.depots = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public moveDepot(moveDepotForm: NgForm){
    console.log('quantity: '+ moveDepotForm.value.quantity)
    if(moveDepotForm.value.quantity < 0 || moveDepotForm.value.quantity > this.stock.quantity){
      alert("Moving quantity can't be negative or higher than "+ this.stock.quantity);
      return;
    }
    this.stockService.moveStock(this.stock, moveDepotForm.value.quantity).subscribe(
      (response: Stock) => {
        moveDepotForm.reset();
        this.getStockById();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public moveSector(moveSectorForm: NgForm):void {
    if(moveSectorForm.value.quantity < 0 || moveSectorForm.value.quantity > this.stock.quantity){
      alert("Moving quantity can't be negative or higher than "+ this.stock.quantity);
      return;
    }
    this.stockService.moveSector(this.stock, moveSectorForm.value.quantity, moveSectorForm.value.sector).subscribe(
      (response: Stock) => {
        console.log(response);
        this.router.navigate([`/stock/${this.stock.productSupplier.product.id}`]);
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }
}
