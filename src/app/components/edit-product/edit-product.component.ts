import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
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
import { YearsService } from 'src/app/services/years.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  public product!:Product
  public brands!: Brand[];
  public models!: Model[];
  public filteredModels!: Model[];
  public glassTypes!: GlassType[];
  public tintings!: Tinting[];
  public bodyVariants!: BodyVariant[];
  public properties!: Properties[];
  public glassBodyVariants!: GlassBodyVariant[];
  public glassProperties!: GlassProperties[];
  public filteredProperties!: Properties[];
  public selectedBrand!: Brand;
  public selectedGlassType!: GlassType;
  public selectedTinting!: Tinting;
  public taxes!: Taxes[];
  public years!: Years[];
  public selectedYears!: Years
  public selectedModel!: Model;
  public selectedTaxes!: Taxes;
  private id!: number;
  image:any = null;
  selectedFiles?: FileList;
  currentFile?: File;
  message = '';
  errorMsg = '';
  bodyVariantsLoaded!: Promise<boolean>;
  propertiesLoaded!: Promise<boolean>;

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
    private router: Router,
    private route: ActivatedRoute,
    private uploadService: UploadFileService

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })
    this.getModels();
    this.productService.getProductById(this.id).subscribe(
      (response: Product) => {
        console.log(response)
        this.product = response;
        this.selectedYears = this.product.years
        this.selectedGlassType = this.product.glassType
        this.selectedTinting = this.product.tinting
        this.selectedBrand = this.product.model.brand
        this.filteredModels = this.models?.filter(m => m.brand.id == this.product.model.brand.id)
        this.selectedModel = this.product.model
        this.getGlassBodyVariants()
        this.getGlassProperties()
      },
      (error:HttpErrorResponse) =>{
        alert(error.message)
      }
    )
    this.getBrands();
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
  
  public getGlassBodyVariants(){
    this.glassBodyVariantService.getGlassBodyVariantByProduct(this.product.id).subscribe(
      (response: GlassBodyVariant[])=>{
        console.log(response);
        this.glassBodyVariants = response;
        this.bodyVariantsLoaded = Promise.resolve(true)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }

  public getGlassProperties(){
    this.glassPropertiesService.getGlassPropertiesByProduct(this.product.id).subscribe(
      (response: GlassProperties[]) => {
        console.log(response)
        this.glassProperties = response;
        this.propertiesLoaded = Promise.resolve(true)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
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
        // this.glassBodyVariantService.getGlassBodyVariants().subscribe(
        //   (response: GlassBodyVariant[])=>{
        //     response = response.filter(r => r.product.id == this.id);
        //   }
        // )
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
    this.filteredModels = this.models?.filter(m => m.brand.id == filterModelsForm.value.brand.id)
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

  public onEditProduct(editProduct: NgForm){
    let newProduct: Product = editProduct.value;
    let ext = this.selectedFiles!.item(0)!.name.substring(this.selectedFiles!.item(0)!.name.lastIndexOf("."))
    newProduct.image = editProduct.value.eurocode.toUpperCase() + ext
    this.productService.updateProduct(newProduct).subscribe(
      (response: Product)=>{
        console.log(response)
        var props: any = document.getElementsByClassName("properties");
          for (let prop of props){
            if(prop.checked == true && !this.glassProperties.some(gp => gp.properties.id == prop.value)){
              console.log("TEST " + prop.value + " | " + this.product.id);
              console.log(this.glassProperties.some(gp => gp.properties.id == prop.value))
              let product_props = {
                id : 0,
                properties:{
                  id: prop.value,
                  name: "test"
                },
                product:{
                  id: this.product.id,
                  name: "test"
                }
              }
              this.glassPropertiesService.addGlassProperties(product_props).subscribe(
                (response: GlassProperties) => {
                  console.log(response)
                } 
              )
            }
            if(prop.checked == false && this.glassProperties.some(gp => gp.properties.id == prop.value)){
              var p = this.glassProperties.find(gp => gp.properties.id == prop.value)
              if(p != undefined){
                this.glassPropertiesService.deleteGlassProperties(p.id).subscribe(
                  (response) =>{
                    console.log("Deleted!")
                  },
                  (error: HttpErrorResponse) =>{
                    alert(error.message)
                  }
                )
              }
            }
          }
          var bodyVariants: any = document.getElementsByClassName("bodyVariants");
          for (let bv of bodyVariants){
            if(bv.checked == true && !this.glassBodyVariants.some(gbv => gbv.bodyVariant.id == bv.value)){
              console.log("TEST " + bv.value + " | " + this.product.id);

              let product_bv = {
                id : 0,
                bodyVariant:{
                  id: bv.value,
                  name: "test"
                },
                product:{
                  id: this.product.id,
                  name: "test"
                }
              }
              this.glassBodyVariantService.addGlassBodyVariant(product_bv).subscribe(
                (response: GlassBodyVariant) => {
                  console.log(response)
                } 
              )
            }
            if(bv.checked == false && this.glassBodyVariants.some(gbv => gbv.bodyVariant.id == bv.value)){
              var gbv = this.glassBodyVariants.find(gbv => gbv.bodyVariant.id == bv.value)
              if(gbv != undefined){
                this.glassBodyVariantService.deleteGlassBodyVariant(gbv.id).subscribe(
                  (response) => {
                    console.log("DELETED!")
                  },
                  (error: HttpErrorResponse) =>{
                    alert(error.message)
                  }
                )
              }
            }
          }
          this.upload(response.eurocode)
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

  public isBVChecked(id: number){
    return this.glassBodyVariants.some(g => g.bodyVariant.id == id)
  }

  public isPropChecked(id: number){
    return this.glassProperties.some(gp => gp.properties.id == id)
  }

  public deleteProperty(id: number){
    this.glassBodyVariantService.deleteGlassBodyVariant(id).subscribe(
      (response)=>{
        console.log("DELETED!")
        this.getGlassBodyVariants
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }

  public compareFn(y1: Years, y2: Years){
    return y1 && y2 ? y1.id === y2.id : y1 == y2;
  }
}
