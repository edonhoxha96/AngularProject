import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Depot } from '../../models/depot';
import { Sector } from '../../models/sector';
import { Stock } from '../../models/stock';
import { DepotService } from '../../services/depot.service';
import { SectorService } from '../../services/sector.service';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.css']
})
export class DepotComponent implements OnInit {
  public stocks!: Stock[];
  public depots!: Depot[];
  public sectors!: Sector[];
  public selectedDepot!: Depot;
  public selectedSector!: Sector;
  pageStock: Stock[] = [];
  currentStock!: Stock;
  currentIndex = -1;
  
  sectorId = 0;
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 15, 20];

  constructor(
    private stockService: StockService,
    private depotService: DepotService,
    private sectorService: SectorService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Depot")
    //this.getStocks();
    this.getDepots();
    this.getSectors();
    this.retrieveStock();
  }

  // public getStocks(): void {

  //   this.stockService.getStocks().subscribe(
  //     (response: Stock[]) => {
  //       this.stocks = response;
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )
  // }

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

  getRequestParams(sectorId:number, page: number, pageSize: number): any {
    let params: any = {};
    if(sectorId != 0){
      params[`sectorId`] = sectorId;
    }else{
      params[`sectorId`] = 0;
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
    const params = this.getRequestParams(this.sectorId ,this.page, this.pageSize);

    this.stockService.getPaginationStock(params).subscribe(
      (response => {
        const {stocks, totalItems} = response;
        this.pageStock = stocks;
        this.count = totalItems;
        console.log(response);
      }),
      (error => console.log(error.message))
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

  filterSector(filterSector: NgForm):void{
    this.sectorId = filterSector.value.sector;
    this.page = 1;
    this.retrieveStock();
  }
}
