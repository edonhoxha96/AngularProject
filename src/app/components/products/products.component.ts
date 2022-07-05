import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { BodyVariant } from '../../models/bodyvariant';
import { Brand } from '../../models/brand';
import { GlassType } from '../../models/glasstype';
import { Model } from '../../models/model';
import { Product } from '../../models/product';
import { Properties } from '../../models/properties';
import { GlassProperties } from '../../models/glassproperties';
import { Tinting } from '../../models/tinting';
import { Taxes } from '../../models/taxes';
import { BodyVariantService } from '../../services/bodyvariant.service';
import { BrandService } from '../../services/brand.service';
import { GlassPropertiesService } from '../../services/glasproperties.service';
import { GlassBodyVariantService } from '../../services/glassbodyvariant.service';
import { GlassModelYearService } from '../../services/glassmodelyear.service';
import { GlassTypeService } from '../../services/glasstype.service';
import { ModelService } from '../../services/model.service';
import { ProductService } from '../../services/product.service';
import { PropertiesService } from '../../services/properties.service';
import { TintingService } from '../../services/tinting.service';
import { TaxesService } from '../../services/taxes.service';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../models/stock';
import { StockView } from '../../models/stock-view';
import { DepotService } from '../../services/depot.service';
import { Depot } from '../../models/depot';
import { GlassBodyVariant } from '../../models/glassbodyvariant';
import { Supplier } from '../../models/supplier';
import { SupplierService } from '../../services/supplier.service';
import { Sector } from '../../models/sector';
import { SectorService } from '../../services/sector.service';
import { Years } from '../../models/years';
import { YearsService } from '../../services/years.service';
import { ProductSupplierService } from '../../services/productsupplier.service';
import { ProductSupplier } from '../../models/productsupplier';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  title = 'SpringTest';
  public brands!: Brand[];
  public models!: Model[];
  public filteredModels!: Model[];
  public glassTypes!: GlassType[];
  public glassProperties!: GlassProperties[];
  public productProperties!: GlassProperties[];
  public filteredProductProperties!: Properties[];
  public filteredGlassTypes!: GlassType[];
  public tintings!: Tinting[];
  public products!: Product[];
  public selectedDepoF!: Product;
  public selectedProduct!: Product;
  public filteredProducts!: Product[];
  public bodyVariants!: BodyVariant[];
  public filteredBodyVariants!: BodyVariant[];
  public glassBodyVariants!: GlassBodyVariant[];
  public productBodyVariants!: GlassBodyVariant[];
  public properties: Properties[] = [];
  public stocks!: Stock[];
  public depots!: Depot[];
  public selectedDepot!: Depot;
  public filteredStocks!: Stock[];
  public stockView!: StockView[];
  public selectedBrand!: Brand;
  public selectedBrandF!: Brand;
  public selectedGlassType!: GlassType;
  public selectedGlassTypeF!: GlassType;
  public selectedTinting!: Tinting;
  public taxes!: Taxes[];
  public selectedTaxes!: Taxes;
  public selectedModel!: Model;
  public selectedModelF!: Model;
  public suppliers!: Supplier[];
  public selectedSupplier!: Supplier;
  public sectors!: Sector[];
  public selectedSector!: Sector;
  public years!: Years[];
  public selectedYears!: Years;
  public selectedYearsF!: Years;
  public filteredYears: Years[] = [];
  public productSuppliers!: ProductSupplier[];
  public suppliersMap:Map<ProductSupplier,number> = new Map<ProductSupplier,number>();
  public modelid!:number;
  public yearid!:number;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private brandService: BrandService,
    private modelService: ModelService,
    private glassTypeService: GlassTypeService,
    private tintingService: TintingService,
    private productService: ProductService,
    private bodyVariantService: BodyVariantService,
    private propertiesService: PropertiesService,
    private glassBodyVariantService: GlassBodyVariantService,
    private glassPropertiesService: GlassPropertiesService,
    private taxesService: TaxesService,
    private stockService: StockService,
    private depotService: DepotService,
    private supplierService: SupplierService,
    private sectorService: SectorService,
    private yearsService: YearsService,
    private productSupplierService: ProductSupplierService,

    ){}

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params['modelid'])
      console.log(params['yearlid'])
      //this.modelid = params['modelid'];
      //this.yearid = params['yearlid'];
      if(params['modelid'] && params['yearid']){
        this.productService.getProductsByModelAndYear(params['modelid'], params['yearid']).subscribe(
          (res) =>{
            console.log(res)
            this.filteredProducts = res
          },
          (err: HttpErrorResponse) => {
            alert(err.message)
          }
          )
        }
      });
    this.getBodyVariants();
    this.getProperties();  
    this.getProductSuppliers();
    this.getGlassBodyVariants();
    this.getGlassProperties();
    this.getStocks();
    //this.getProducts();
  }
  
  getProperties(){
    this.propertiesService.getPropertiess().subscribe(
      (response: Properties[]) => {
        this.properties = response
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    )
  }

  getBodyVariants(){
    this.bodyVariantService.getBodyVariants().subscribe(
      (response: BodyVariant[]) => {
        this.bodyVariants = response
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    )
  }


  public getPropertiessByProduct(id: number): Properties[]{
    let filteredProperties!: Properties[];
    this.productProperties = this.glassProperties?.filter(g => g.product.id == id);
    this.productProperties?.forEach(p => {
      this.properties.forEach(f => {
        if(p.properties.id == f.id){
          if(typeof filteredProperties == 'undefined'){
            filteredProperties= [f];
          }else{
            filteredProperties.push(f);
          }
        }
      })
    })
    return filteredProperties;
  }

 

  public getBodyVariantsByProduct(id: number): BodyVariant[]{
    let filteredBodyVariants!: BodyVariant[];
    this.productBodyVariants = this.glassBodyVariants?.filter(g => g.product.id == id);
    this.productBodyVariants?.forEach(p => {
      this.bodyVariants?.forEach(f => {
        if(p.bodyVariant.id == f.id){
          if(typeof filteredBodyVariants == 'undefined'){
            filteredBodyVariants= [f];
          }else{
            filteredBodyVariants.push(f);
          }
        }
      })
    })
    return filteredBodyVariants;
  }

  public getGlassBodyVariants(): void{
    this.glassBodyVariantService.getGlassBodyVariants().subscribe(
      (response: GlassBodyVariant[]) => {
        this.glassBodyVariants = response
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getGlassProperties():void {
    this.glassPropertiesService.getGlassPropertiess().subscribe(
      (response: GlassProperties[]) => {
        this.glassProperties = response
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getStocks(): void {

    this.stockService.getStocks().subscribe(
      (response: Stock[]) => {
        this.stocks = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  // public getProducts(): void {
  //   this.productService.getProducts().subscribe(
  //     (response: Product[]) => {
  //       this.products = response;
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )
  // }

  public filterProducts(filterProductsForm: NgForm): void {
    this.filteredStocks = this.stocks.filter(s => s.depot.id == filterProductsForm.value.depot)
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

  public getProductSuppliersMap(id: number):void{
    this.suppliersMap.clear();
    this.productSuppliers?.forEach(supp => {
      this.stocks?.forEach(s => {
        if(s.productSupplier.id == supp.id && supp.product.id == id){
          this.suppliersMap.set(supp, this.getQuantity(supp.product.id, supp.supplier.id))
        }
      })
    })
    // if(this.suppliersMap.size == 0){
    //   this.suppliersMap.set("None", 0)
    // }
  }

  public getQuantity(prodId: number, supId:number):number{
    let quantity:number = 0;;
    this.stocks.forEach(s => {
      if(s.productSupplier.product.id == prodId && s.productSupplier.supplier.id == supId){
        quantity += s.quantity
      }
    })

    return quantity;
  } 

  public searchEuro(searchForm: NgForm):void{
    console.log(searchForm.value.search)
    this.productService.getProductsByEurocode(searchForm.value.search).subscribe(
      (response: Product[])=>{
        this.filteredProducts = response
      },
      (error: HttpErrorResponse) => {
        console.log(error.error.message)
      }

    )
  }
}
