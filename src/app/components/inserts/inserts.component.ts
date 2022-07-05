import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BodyVariant } from '../../models/bodyvariant';
import { Brand } from '../../models/brand';
import { GlassType } from '../../models/glasstype';
import { Model } from '../../models/model';
import { Properties } from '../../models/properties';
import { Tinting } from '../../models/tinting';
import { Taxes } from '../../models/taxes';
import { City } from '../../models/city';
import { Country } from '../../models/country';
import { CityService } from '../../services/city.service';
import { CountryService } from '../../services/country.service';
import { BodyVariantService } from '../../services/bodyvariant.service';
import { BrandService } from '../../services/brand.service';
import { GlassTypeService } from '../../services/glasstype.service';
import { ModelService } from '../../services/model.service';
import { PropertiesService } from '../../services/properties.service';
import { TintingService } from '../../services/tinting.service';
import { TaxesService } from '../../services/taxes.service';
import { Sector } from '../../models/sector';
import { SectorService } from '../../services/sector.service';
import { Years } from '../../models/years';
import { YearsService } from '../../services/years.service';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { GlassPropertiesService } from '../../services/glasproperties.service';
import { GlassBodyVariantService } from '../../services/glassbodyvariant.service';
import { GlassProperties } from '../../models/glassproperties';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../models/stock';
import { Depot } from '../../models/depot';
import { GlassBodyVariant } from '../../models/glassbodyvariant';
import { StockView } from '../../models/stock-view';
import { Supplier } from '../../models/supplier';
import { DepotService } from '../../services/depot.service';
import { SupplierService } from '../../services/supplier.service';
import { ProductSupplierService } from '../../services/productsupplier.service';
import { ProductSupplier } from '../../models/productsupplier';



@Component({
    selector: 'app-inserts',
    templateUrl: './inserts.component.html',
    styleUrls: ['./inserts.component.css']
  })
  export class InsertsComponent implements OnInit{
    title = 'Inserts';
    public brands!: Brand[];
    public models!: Model[];
    public countries!: Country[];
    public selectedCountry!: Country[];
    public cities!: City[];
    public filteredModels!: Model[];
    public glassTypes!: GlassType[];
    public filteredGlassTypes!: GlassType[];
    public tintings!: Tinting[];
    public bodyVariants!: BodyVariant[];
    public properties!: Properties[];
    public selectedBrand!: Brand;
    public selectedBrandF!: Brand;
    public selectedGlassType!: GlassType;
    public selectedGlassTypeF!: GlassType;
    public selectedTinting!: Tinting;
    public taxes!: Taxes[];
    public selectedTaxes!: Taxes;
    public sectors!: Sector[];
    public years!: Years[];
    public selectedYears!: Years;
    public glassProperties!: GlassProperties[];
    public productProperties!: GlassProperties[];
    public filteredProductProperties!: Properties[];
    public products!: Product[];
    public selectedProduct!: Product;
    public selectedDepoF!: Product;
    public filteredProducts!: Product[];
    public filteredBodyVariants!: BodyVariant[];
    public glassBodyVariants!: GlassBodyVariant[];
    public productBodyVariants!: GlassBodyVariant[];
    public stocks!: Stock[];
    public depots!: Depot[];
    public selectedDepot!: Depot;
    public filteredStocks!: Stock[];
    public stockView!: StockView[];
    public selectedModel!: Model;
    public selectedModelF!: Model;
    public suppliers!: Supplier[];
    public selectedSupplier!: Supplier;
    public selectedSector!: Sector;
    public productSuppliers!: ProductSupplier[];
    public selectedProductSupplier!: ProductSupplier;
  
    constructor(
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
      private cityService: CityService,
      private countryService: CountryService,
      private productSupplierService: ProductSupplierService,
      ){}
  
    ngOnInit() {
      this.getBrands();
      this.getModels();
      this.getBodyVariants();
      this.getGlassTypes();
      this.getProperties();
      this.getTintings();
      this.getTaxes();
      this.getCities();
      this.getCountries();
      this.getSectors();
      this.getYears();
      this.getDepots();
      this.getSuppliers();
      this.getProducts();
      this.getProductSuppliers();
      this.getStocks();
    }

    public getProducts(){
      this.productService.getProducts().subscribe(
        (response: Product[]) => {
          this.products = response;
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
    
    public getGlassProperties(): void{
      this.glassPropertiesService.getGlassPropertiess().subscribe(
        (response: GlassProperties[]) => {
          this.glassProperties = response
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
        )
      }

    public onAddBrand(addForm: NgForm): void {
      this.brandService.addBrand(addForm.value).subscribe(
        (response: Brand) => {
          console.log(response);
          addForm.reset();
          this.getBrands();
        },
        (error: HttpErrorResponse) => {
          alert(error.status);
        }
      )
    }
  
    public getBrands(): void {
      this.brandService.getBrands().subscribe(
        (response: Brand[]) => {
          this.brands = response;
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

    public onAddSector(addSector: NgForm): void {
      this.sectorService.addSector(addSector.value).subscribe(
        (response: Sector) => {
          console.log(response);
          addSector.reset();
          this.getSectors();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }

    public getYears(): void {
      this.yearsService.getYears().subscribe(
        (response: Years[]) => {
          this.years = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }

    public onAddYears(addYears: NgForm): void {
      this.yearsService.addYears(addYears.value).subscribe(
        (response: Years) => {
          console.log(response);
          addYears.reset();
          this.getYears();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }
    
    public getCountries(): void {
      this.countryService.getCountrys().subscribe(
        (response: Country[]) => {
          this.countries = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
        )
      }
      
      public onAddCountry(addCountry: NgForm): void {
        this.countryService.addCountry(addCountry.value).subscribe(
          (response: Country) => {
            console.log(response);
            addCountry.reset();
            this.getCountries();
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

      public onAddCity(addCity: NgForm): void {
        var city = {
          id: 0,
          name: addCity.value.name,
          country:{
            id: addCity.value.country,
            name: 'test'
          }
        }
        this.cityService.addCity(city).subscribe(
          ( response: City) => {
            console.log(response);
            addCity.reset();
            this.getCities();
          },
          (error: HttpErrorResponse) => {
            alert(error.error.message);
          }
        )
      }

    public getModels(): void {
      this.modelService.getModels().subscribe(
        (response: Model[]) => {
          this.models = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }
    
    public onAddModel(addModel: NgForm): void {
      var model = {
        id: 0,
        name: addModel.value.name,
        brand:{
          id: addModel.value.brand,
          name: 'test'
        }
      }
      this.modelService.addModel(model).subscribe(
        ( response: Model) => {
          console.log(response);
          addModel.reset();
          this.getModels();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }
  
    public getGlassTypes(): void {
      this.glassTypeService.getGlassTypes().subscribe(
        (response: GlassType[]) => {
          this.glassTypes = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }
  
    public onAddGlassType(addGlassType: NgForm): void {
      this.glassTypeService.addGlassType(addGlassType.value).subscribe(
        ( response: GlassType) => {
          console.log(response);
          this.getGlassTypes();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }
  
    public getBodyVariants(): void {
      this.bodyVariantService.getBodyVariants().subscribe(
        (response: BodyVariant[]) => {
          this.bodyVariants = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }
  
    public onAddBodyVariant(addBodyVariant: NgForm): void {
      this.bodyVariantService.addBodyVariant(addBodyVariant.value).subscribe(
        ( response: BodyVariant) => {
          console.log(response);
          this.getBodyVariants();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }
  
    public getProperties(): void {
      this.propertiesService.getPropertiess().subscribe(
        (response: Properties[]) => {
          this.properties = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }
  
    public onAddProperties(addProperties: NgForm): void {
      this.propertiesService.addProperties(addProperties.value).subscribe(
        ( response: Properties) => {
          console.log(response);
          this.getProperties();
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
  
    public getTintings(): void {
      this.tintingService.getTintings().subscribe(
        (response: Tinting[]) => {
          this.tintings = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }
  
    public onAddTintings(addTintings: NgForm): void {
      this.tintingService.addTinting(addTintings.value).subscribe(
        ( response: Tinting) => {
          console.log(response);
          this.getTintings();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }
  
    public getTaxes(): void {
      this.taxesService.getTaxes().subscribe(
        (response: Taxes[]) => {
          this.taxes = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }
  
    public onAddTaxes(addTaxes: NgForm): void {
      this.taxesService.addTaxes(addTaxes.value).subscribe(
        ( response: Taxes) => {
          console.log(response);
          this.getTaxes();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }

    public filterModels(filterModelsForm: NgForm): void{
      this.filteredModels = this.models.filter(m => m.brand.id == filterModelsForm.value.brand)
      //this.filteredProducts = this.products.filter(p => p.model.brand.id == filterModelsForm.value.brand)
      // this.filteredModels.forEach(e => { 
      //   this.filteredProducts = this.products.filter(p => p.model.id = e.id)
      // });
    }

    public onAddProduct(addProduct: NgForm): void {
      console.log('MODEL: '+ addProduct.value.model)
      let product = {
        id: 0,
        eurocode: addProduct.value.eurocode,
        image: '',
        years: {
          id: addProduct.value.years,
          name: ''
        },
        glassType: {
          id: addProduct.value.glassType,
          name: 'glasstype'
        },
        tinting: {
          id: addProduct.value.tinting,
          name: 'tinting'
        },
        model:{
          id: addProduct.value.model,
          name:'model',
          brand:{
            id: 0,
            name: 'test'
          }
        }
      }
      var prodId = 0;
      
      this.productService.addProduct(product).subscribe(
        ( response: Product) => {
          console.log("ProductId: " +  response.id);
          prodId = response.id
          var props: any = document.getElementsByClassName("properties");
            for (let prop of props){
              if(prop.checked == true){
                console.log("TEST " + prop.value + " | " + prodId);
                let product_props = {
                  id : 0,
                  properties:{
                    id: prop.value,
                    name: "test"
                  },
                  product:{
                    id: prodId,
                    name: "test"
                  }
                }
                this.glassPropertiesService.addGlassProperties(product_props).subscribe(
                  (response: GlassProperties) => {
                    console.log(response)
                  } 
                )
              }
            }
            var bodyVariants: any = document.getElementsByClassName("bodyVariants");
            for (let bv of bodyVariants){
              if(bv.checked == true){
                console.log("TEST " + bv.value + " | " + prodId);
                let product_bv = {
                  id : 0,
                  bodyVariant:{
                    id: bv.value,
                    name: "test"
                  },
                  product:{
                    id: prodId,
                    name: "test"
                  }
                }
                this.glassBodyVariantService.addGlassBodyVariant(product_bv).subscribe(
                  (response: GlassBodyVariant) => {
                    console.log(response)
                  } 
                )
              }
            }
            // let stock = {
            //   id:0,
            //   quantity: addProduct.value.stock,
            //   buyingPrice: addProduct.value.buyingPrice,
            //   sellingPrice: addProduct.value.sellingPrice,
            //   depot: {
            //     id: 1,
            //     name: 'test',
            //     address: 'test',
            //     city: {
            //       id: 0,
            //       name: 'test',
            //       country: {
            //         id: 0,
            //         name: 'test'
            //       }
            //     }
            //   },
            //   product: {
            //     id: prodId,
            //     eurocode: '',
            //     stock: 0,
            //     image: '',
            //     years: {
            //       id: 0,
            //       name: ''
            //     },
            //     buyingPrice: 0,
            //     sellingPrice: 0,
            //     glassType: {
            //       id: 0,
            //       name: 'test'
            //     },
            //     tinting: {
            //       id: 0,
            //       name: 'test'
            //     },
            //     model: {
            //       id: 0,
            //       name: 'test',
            //       brand:{
            //         id: 0,
            //         name: 'test'
            //       }
            //     }
            //   },
            //   supplier:{
            //     id: addProduct.value.supplier,
            //     firstName: 'test',
            //     lastName: 'test',
            //     phone: 'test',
            //     address: 'test',
            //     description: 'test',
            //     city: {
            //       id:0,
            //       name: "testcity",
            //       country:{
            //         id:0,
            //         name: "testcountry",
            //       }
            //     }
            //   },
            //   sector:{
            //     id:addProduct.value.sector,
            //     name:'test'
            //   }
            // }
            // this.stockService.addStock(stock).subscribe(
            //   ( response: Stock) => {
            //     console.log(response);
            //   },
            //   (error: HttpErrorResponse) => {
            //     alert(error.message);
            //   }
            // )
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

    public onAddProductSupplier(addProductSupplier: NgForm):void{
      console.log(this.suppliers.find(s => s.id == addProductSupplier.value.supplier))
      let supp = this.suppliers.find(s => s.id == addProductSupplier.value.supplier);
      let prod = this.products.find(p => p.id == addProductSupplier.value.product);
      let ps: ProductSupplier= {
        id: 0,
        buyingPrice: addProductSupplier.value.buyingPrice,
        sellingPrice: addProductSupplier.value.sellingPrice,
        product: prod!,
        supplier: supp!
      }
      this.productSupplierService.addProductSupplier(ps).subscribe(
        (response: ProductSupplier) => {
          this.getProductSuppliers();
        },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      )
    }

    public onAddStock(addStock:NgForm){
      if(this.stocks.some(s => s.sector.id == addStock.value.sector && s.productSupplier.id == addStock.value.productSupplier)){
        alert("PRODUCT ALREADY EXISTS IN SPECIFIED SECTOR!");
        return;
      }
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