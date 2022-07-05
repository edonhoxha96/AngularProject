import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { City } from '../../models/city';
import { Costumer } from '../../models/costumer';
import { Product } from '../../models/product';
import { PurchasesOrder } from '../../models/purchasesorder';
import { SalesOrder } from '../../models/salesorder';
import { Status } from '../../models/status';
import { Supplier } from '../../models/supplier';
import { CityService } from '../../services/city.service';
import { CostumerService } from '../../services/costumer.service';
import { ProductService } from '../../services/product.service';
import { PurchasesOrderService } from '../../services/purchasesorder.service';
import { SalesOrderService } from '../../services/salesorder.service';
import { StatusService } from '../../services/status.service';
import { SupplierService } from '../../services/supplier.service';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {
  title= 'POS';
  public statuses!: Status[];
  public selectedStatus!: Status;
  public editStatus!: Status;
  public costumers!: Costumer[];
  public selectedCostumer!: Costumer;
  public suppliers!: Supplier[];
  public selectedSupplier!: Supplier;
  public cities!: City[];
  public selectedCity!: City;
  public products!: Product[]
  public selectedProduct!: Product;
  public purchaseOrders!: PurchasesOrder[];
  public salesOrders!: SalesOrder[];

  constructor(
    private statusService: StatusService,
    private costumerService: CostumerService,
    private cityService: CityService,
    private productService: ProductService,
    private supplierService: SupplierService,
    private purchaseOrdersService: PurchasesOrderService,
    private salesOrderService: SalesOrderService
  ) { }

  ngOnInit(): void {
    this.getCities();
    this.getCostumers();
    this.getStatuses();
    this.getProducts();
    this.getSuppliers();
    this.getPurchaseOrders();
    this.getSalesOrders()
  }

  public getStatuses(): void{
    this.statusService.getStatus().subscribe(
      (response:Status[]) => {
        this.statuses= response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddStatus(addStatus: NgForm): void{
    this.statusService.addStatus(addStatus.value).subscribe(
      (response: Status) => {
        console.log(response)
        this.getStatuses();
        addStatus.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public deleteStatus(id: number): void{
    this.statusService.deleteStatus(id).subscribe(
    (response: void) => {
      console.log(response);
      this.getStatuses();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
    );
  }

  public getCostumers(): void{
    this.costumerService.getCostumers().subscribe(
      (response: Costumer[]) => {
        this.costumers = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddCostumer(addCostumer: NgForm): void{
    let cos:Costumer = {
      id:0,
      firstName: addCostumer.value.firstName,
      lastName: addCostumer.value.lastName,
      phone: addCostumer.value.phone,
      address: addCostumer.value.phone,
      description: addCostumer.value.description,
      city: {
        id: addCostumer.value.city,
        name: 'test',
        country: {
          id: 0,
          name: 'test'
        }
      }
    }
    this.costumerService.addCostumer(cos).subscribe(
      (response: Costumer) => {
        this.getCostumers();
        addCostumer.reset();
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

  public onAddSupplier(addSupplier: NgForm): void{
    let sup:Supplier = {
      id:0,
      firstName: addSupplier.value.firstName,
      lastName: addSupplier.value.lastName,
      phone: addSupplier.value.phone,
      address: addSupplier.value.phone,
      description: addSupplier.value.description,
      city: {
        id: addSupplier.value.city,
        name: 'test',
        country: {
          id: 0,
          name: 'test'
        }
      }
    }
    this.supplierService.addSupplier(sup).subscribe(
      (response: Supplier) => {
        this.getSuppliers();
        addSupplier.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getCities(): void {
    this.cityService.getCitys().subscribe(
      (response: City[]) => {
        this.cities = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getProducts(): void {
    this.productService.getProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getPurchaseOrders():void{
    this.purchaseOrdersService.getPurchasesOrders().subscribe(
    (response: PurchasesOrder[]) => {
      this.purchaseOrders= response;
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
    )
  }

  public getSalesOrders():void{
    this.salesOrderService.getSalesOrders().subscribe(
    (response: SalesOrder[]) => {
      this.salesOrders= response;
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    });
  }

  public onAddPurchaseOrder(addPurchaseOrder: NgForm): void{
    let purchaseOrder: PurchasesOrder = {
      id:0,
      description: addPurchaseOrder.value.description,
      quantity: addPurchaseOrder.value.quantity,
      supplier: {
        id: addPurchaseOrder.value.supplier,
        firstName: 'test'
      },
      product: {
        id: addPurchaseOrder.value.product
      },
      status:{
        id:addPurchaseOrder.value.status,
        name:'test'
      }
    }
    this.purchaseOrdersService.addPurchasesOrder(purchaseOrder).subscribe(
      (response: PurchasesOrder) => {
        this.getPurchaseOrders();
        addPurchaseOrder.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddSalesOrder(addSalesOrder: NgForm): void{
    let salesOrder: SalesOrder = {
      id:0,
      description: addSalesOrder.value.description,
      quantity: addSalesOrder.value.quantity,
      costumer: {
        id: addSalesOrder.value.costumer,
        firstName: 'test'
      },
      product: {
        id: addSalesOrder.value.product
      },
      status:{
        id:addSalesOrder.value.status,
        name:'test'
      }
    }
    this.salesOrderService.addSalesOrder(salesOrder).subscribe(
      (response: SalesOrder) => {
        this.getSalesOrders();
        addSalesOrder.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onEditStatus(status: Status){
    this.editStatus = status;
    console.log(this.editStatus);
  }

  public onUpdateStatus(editStatusForm: NgForm){
    this.statusService.updateStatus(editStatusForm.value).subscribe(
      (response) => {
        console.log(response);
        this.getStatuses();
        editStatusForm.reset();
      }
    )
  }
}
