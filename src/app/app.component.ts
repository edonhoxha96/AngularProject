import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';
import { NgForm } from '@angular/forms';
import { BodyVariant } from './models/bodyvariant';
import { Brand } from './models/brand';
import { GlassType } from './models/glasstype';
import { Model } from './models/model';
import { Product } from './models/product';
import { ProductionYear } from './models/productionyear';
import { Properties } from './models/properties';
import { GlassProperties } from './models/glassproperties';
import { Tinting } from './models/tinting';
import { Taxes } from './models/taxes';
import { BodyVariantService } from './services/bodyvariant.service';
import { BrandService } from './services/brand.service';
import { GlassPropertiesService } from './services/glasproperties.service';
import { GlassBodyVariantService } from './services/glassbodyvariant.service';
import { GlassModelYearService } from './services/glassmodelyear.service';
import { GlassTypeService } from './services/glasstype.service';
import { ModelService } from './services/model.service';
import { ProductService } from './services/product.service';
import { ProductionYearService } from './services/productionyear';
import { PropertiesService } from './services/properties.service';
import { TintingService } from './services/tinting.service';
import { TaxesService } from './services/taxes.service';
import { StockService } from './services/stock.service';
import { Stock } from './models/stock';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'SpringTest';
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  // public brands!: Brand[];
  // public models!: Model[];
  // public filteredModels!: Model[];
  // public glassTypes!: GlassType[];
  // public filteredGlassTypes!: GlassType[];
  // public tintings!: Tinting[];
  // public productionYears!: ProductionYear[];
  // public products!: Product[];
  // public filteredProducts!: Product[];
  // public bodyVariants!: BodyVariant[];
  // public properties!: Properties[];
  // public stocks!: Stock[];
  // public filteredStocks!: Stock[];
  // public selectedBrand!: Brand;
  // public selectedBrandF!: Brand;
  // public selectedGlassType!: GlassType;
  // public selectedGlassTypeF!: GlassType;
  // public selectedTinting!: Tinting;
  // public taxes!: Taxes[];
  // public selectedTaxes!: Taxes;
  // public selectedModel!: Model;
  // public selectedModelF!: Model;
  // public selectedYear!: ProductionYear;


  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router
    // private brandService: BrandService,
    // private modelService: ModelService,
    // private glassTypeService: GlassTypeService,
    // private tintingService: TintingService,
    // private productionYearService: ProductionYearService,
    // private productService: ProductService,
    // private glassModelYearService: GlassModelYearService,
    // private bodyVariantService: BodyVariantService,
    // private propertiesService: PropertiesService,
    // private glassBodyVariantService: GlassBodyVariantService,
    // private glassPropertiesService: GlassPropertiesService,
    // private taxesService: TaxesService,
    // private stockService: StockService,
    ){}

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ADMIN');
      this.showModeratorBoard = this.roles.includes('MODERATOR');

      this.username = user.username;
    }
    else {
      // this.router.navigate(['login'])
    }
    // this.getBrands();
    // this.getModels();
    // this.getBodyVariants();
    // this.getGlassTypes();
    // this.getProperties();
    // this.getTintings();
    // this.getProductionYears();
    // this.getProducts();
    // this.getTaxes();
    // this.getStocks();
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  // public onAddBrand(addForm: NgForm): void {
  //   this.brandService.addBrand(addForm.value).subscribe(
  //     (response: Brand) => {
  //       console.log(response);
  //       addForm.reset();
  //       this.getBrands();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )
  // }

  // public getBrands(): void {
  //   this.brandService.getBrands().subscribe(
  //     (response: Brand[]) => {
  //       this.brands = response;
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )
  // }

  // public getModels(): void {
  //   this.modelService.getModels().subscribe(
  //     (response: Model[]) => {
  //       this.models = response;
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )
  // }
  
  // public onAddModel(addModel: NgForm): void {
  //   var model = {
  //     id: 0,
  //     name: addModel.value.name,
  //     brand:{
  //       id: addModel.value.brand,
  //       name: 'test'
  //     }
  //   }
  //   this.modelService.addModel(model).subscribe(
  //     ( response: Model) => {
  //       console.log(response);
  //       addModel.reset();
  //       this.getModels();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )
  // }

  // public getGlassTypes(): void {
  //   this.glassTypeService.getGlassTypes().subscribe(
  //     (response: GlassType[]) => {
  //       this.glassTypes = response;
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )
  // }

  // public onAddGlassType(addGlassType: NgForm): void {
  //   this.glassTypeService.addGlassType(addGlassType.value).subscribe(
  //     ( response: GlassType) => {
  //       console.log(response);
  //       this.getGlassTypes();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )
  // }

  // public getBodyVariants(): void {
  //   this.bodyVariantService.getBodyVariants().subscribe(
  //     (response: BodyVariant[]) => {
  //       this.bodyVariants = response;
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )
  // }

  // public onAddBodyVariant(addBodyVariant: NgForm): void {
  //   this.bodyVariantService.addBodyVariant(addBodyVariant.value).subscribe(
  //     ( response: BodyVariant) => {
  //       console.log(response);
  //       this.getBodyVariants();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )
  // }

  // public getProperties(): void {
  //   this.propertiesService.getPropertiess().subscribe(
  //     (response: Properties[]) => {
  //       this.properties = response;
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )
  // }

  // public onAddProperties(addProperties: NgForm): void {
  //   this.propertiesService.addProperties(addProperties.value).subscribe(
  //     ( response: Properties) => {
  //       console.log(response);
  //       this.getProperties();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )
  // }

  // public getTintings(): void {
  //   this.tintingService.getTintings().subscribe(
  //     (response: Tinting[]) => {
  //       this.tintings = response;
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )
  // }

  // public onAddTintings(addTintings: NgForm): void {
  //   this.tintingService.addTinting(addTintings.value).subscribe(
  //     ( response: Tinting) => {
  //       console.log(response);
  //       this.getTintings();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )
  // }

  // public getTaxes(): void {
  //   this.taxesService.getTaxes().subscribe(
  //     (response: Taxes[]) => {
  //       this.taxes = response;
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )
  // }

  // public onAddTaxes(addTaxes: NgForm): void {
  //   this.taxesService.addTaxes(addTaxes.value).subscribe(
  //     ( response: Taxes) => {
  //       console.log(response);
  //       this.getTaxes();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )
  // }

  // public getProductionYears(): void {
  //   this.productionYearService.getProductionYears().subscribe(
  //     (response: ProductionYear[]) => {
  //       this.productionYears = response;
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )
  // }

  // public onAddProductionYear(addProductionYear: NgForm): void {
  //   console.log(addProductionYear);
  //   this.productionYearService.addProductionYear(addProductionYear.value).subscribe(
  //     ( response: ProductionYear) => {
  //       console.log(response);
  //       this.getProductionYears();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )
  // }

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

  // public onAddProduct(addProduct: NgForm): void {
    
  //   let product = {
  //     id: 0,
  //     eurocode: addProduct.value.eurocode,
  //     stock: addProduct.value.stock,
  //     image: '',
  //     years: addProduct.value.years,
  //     buyingPrice: addProduct.value.buyingPrice,
  //     sellingPrice: addProduct.value.sellingPrice,
  //     glassType: {
  //       id: addProduct.value.glassType,
  //       name: 'glasstype'
  //     },
  //     tinting: {
  //       id: addProduct.value.tinting,
  //       name: 'tinting'
  //     },
  //     model:{
  //       id: addProduct.value.model,
  //       name:'model',
  //       brand:{
  //         id: 0,
  //         name: 'test'
  //       }
  //     }
  //   }
  //   var prodId = 0;
    
  //   this.productService.addProduct(product).subscribe(
  //     ( response: Product) => {
  //       console.log("ProductId: " +  response.id);
  //       prodId = response.id
  //       var props: any = document.getElementsByClassName("properties");
  //         for (let prop of props){
  //           if(prop.checked == true){
  //             console.log("TEST " + prop.value + " | " + prodId);
  //             let product_props = {
  //               id : 0,
  //               properties:{
  //                 id: prop.value,
  //                 name: "test"
  //               },
  //               product:{
  //                 id: prodId,
  //                 name: "test"
  //               }
  //             }
  //             this.glassPropertiesService.addGlassProperties(product_props).subscribe(
  //               (response: GlassProperties) => {
  //                 console.log(response)
  //               } 
  //             )
  //           }
  //         }
  //       this.getProducts();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )

  // }

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

  // public getStocksByModel(id: number): void{
  //   this.stockService.getStocksByModel(id).subscribe(
  //     (response: Stock[]) => {
  //       this.filteredStocks = response
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

  // public filterModels(filterModelsForm: NgForm): void{
  //   console.log(filterModelsForm.value)
  //   this.filteredModels = this.models.filter(m => m.brand.id == filterModelsForm.value.brand)
  //   this.filteredProducts = this.products.filter(p => p.model.brand.id == filterModelsForm.value.brand)
    
  // }

  // public filterBrands(filterBrandsForm: NgForm): void{
  //   console.log(this.filteredModels);
  //   this.getStocksByModel(filterBrandsForm.value.model)
  //   this.filteredProducts = this.products.filter(p => p.model.id == filterBrandsForm.value.model)
  // }

  // filterGlassType(filterGlassTypeForm: NgForm): void{
  //   this.filteredProducts = this.filteredProducts.filter( p => p.glassType.id == filterGlassTypeForm.value.glassType)
  // }
}
