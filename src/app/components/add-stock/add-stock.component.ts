import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Depot } from 'src/app/models/depot';
import { ProductSupplier } from 'src/app/models/productsupplier';
import { Sector } from 'src/app/models/sector';
import { Stock } from 'src/app/models/stock';
import { DepotService } from 'src/app/services/depot.service';
import { ProductSupplierService } from 'src/app/services/productsupplier.service';
import { SectorService } from 'src/app/services/sector.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {
  public sectors!: Sector[];
  public depots!: Depot[];
  public selectedSector!: Sector;
  public selectedDepot!: Depot;
  public selectedProductSupplier!: ProductSupplier;
  public productSuppliers!: ProductSupplier[];

  constructor(
    private stockService: StockService,
    private depotService: DepotService,
    private sectorService: SectorService,
    private productSupplierService: ProductSupplierService
  ) { }

  ngOnInit(): void {
    this.getProductSuppliers();
    this.getDepots();
    this.getSectors();
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

  public getProductSuppliers(){
    this.productSupplierService.getProductSuppliers().subscribe(
      (response: ProductSupplier[]) => {
        this.productSuppliers = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

public onAddStock(addStock:NgForm){
    // if(this.stocks.some(s => s.sector.id == addStock.value.sector && s.productSupplier.id == addStock.value.productSupplier)){
    //   alert("PRODUCT ALREADY EXISTS IN SPECIFIED SECTOR!");
    //   return;
    // }
    let prodSup: ProductSupplier = this.productSuppliers.find(ps => ps.id == addStock.value.productSupplier)!;
    let newStock:Stock = {
      id:0,
      quantity: addStock.value.quantity,
      depot: {
        id: addStock.value.depot,
        name: 'test',
        address: 'test',
        city: {
          id: 0,
          name: 'test',
          country: {
            id: 0,
            name: 'test'
          }
        }
      },
      sector:{
        id:addStock.value.sector,
        name:'test'
      },
      productSupplier: prodSup,
    }
    this.stockService.addStock(newStock).subscribe(
      (resopnse: Stock) => {
        console.log("STOCK ADDED");
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }
}
