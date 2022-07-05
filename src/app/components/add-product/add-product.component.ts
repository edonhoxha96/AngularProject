import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BodyVariant } from 'src/app/models/bodyvariant';
import { Brand } from 'src/app/models/brand';
import { GlassBodyVariant } from 'src/app/models/glassbodyvariant';
import { GlassProperties } from 'src/app/models/glassproperties';
import { GlassType } from 'src/app/models/glasstype';
import { Model } from 'src/app/models/model';
import { Product } from 'src/app/models/product';
import { Properties } from 'src/app/models/properties';
import { Taxes } from 'src/app/models/taxes';
import { Tinting } from 'src/app/models/tinting';
import { Years } from 'src/app/models/years';
import { BodyVariantService } from 'src/app/services/bodyvariant.service';
import { BrandService } from 'src/app/services/brand.service';
import { GlassPropertiesService } from 'src/app/services/glasproperties.service';
import { GlassBodyVariantService } from 'src/app/services/glassbodyvariant.service';
import { GlassTypeService } from 'src/app/services/glasstype.service';
import { ModelService } from 'src/app/services/model.service';
import { ProductService } from 'src/app/services/product.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { TaxesService } from 'src/app/services/taxes.service';
import { TintingService } from 'src/app/services/tinting.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { YearsService } from 'src/app/services/years.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  public brands!: Brand[];
  public models!: Model[];
  public filteredModels!: Model[];
  public glassTypes!: GlassType[];
  public tintings!: Tinting[];
  public bodyVariants!: BodyVariant[];
  public properties!: Properties[];
  public selectedBrand!: Brand;
  public selectedGlassType!: GlassType;
  public selectedTinting!: Tinting;
  public taxes!: Taxes[];
  public years!: Years[];
  public selectedYears!: Years;
  public selectedModel!: Model;
  public selectedTaxes!: Taxes;
  image:any = null;
  selectedFiles?: FileList;
  currentFile?: File;
  message = '';
  errorMsg = '';


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
    private yearsService: YearsService,
    private uploadService: UploadFileService
  ) { }

  ngOnInit(): void {
    this.getBrands();
    this.getModels();
    this.getBodyVariants();
    this.getGlassTypes();
    this.getProperties();
    this.getTintings();
    this.getTaxes();
    this.getYears();
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

  public filterModels(filterModelsForm: NgForm): void{
    this.filteredModels = this.models.filter(m => m.brand.id == filterModelsForm.value.brand)
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    const preview = document.querySelector('img');
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      // convert image file to base64 string
      if(preview != null && reader.result != null){
        preview.src = reader.result.toString();

      }
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  public onAddProduct(addProduct: NgForm): void {
    console.log('MODEL: '+ addProduct.value.model)
    let ext = this.selectedFiles!.item(0)!.name.substring(this.selectedFiles!.item(0)!.name.lastIndexOf("."))
    let product = {
      id: 0,
      eurocode: addProduct.value.eurocode,
      image: addProduct.value.eurocode.toUpperCase() + ext, // duhet me u ndreq
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
          this.upload(response.eurocode)
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

  upload(name: string): void {
    this.errorMsg = '';

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile, name).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              console.log(Math.round(100 * event.loaded / event.total));

            } else if (event instanceof HttpResponse) {
              this.message = "Image uploaded successfully";
            }
          },
          (err: any) => {
            console.log(err);

            if (err.error && err.error.message) {
              this.errorMsg = err.error.message;
            } else {
              this.errorMsg = 'Error occurred while uploading a file!';
            }

            this.currentFile = undefined;
          });
      }

      this.selectedFiles = undefined;
    }
  }
}
