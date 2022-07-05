import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Model } from 'src/app/models/model';
import { BrandService } from 'src/app/services/brand.service';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-edit-model',
  templateUrl: './edit-model.component.html',
  styleUrls: ['./edit-model.component.css']
})
export class EditModelComponent implements OnInit {
  public brands!: Brand[];
  public model!: Model;
  public selectedBrand!:Brand;
  public id!: number;
  public brandId!: number;
  constructor(private modelService:ModelService, private brandService: BrandService, private router: Router, private route:ActivatedRoute) { }


  ngOnInit(): void {
    this.getBrands()
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })
    this.modelService.getModelById(this.id).subscribe(
      (response) =>{
        this.model = response;
        this.selectedBrand = this.model.brand
      },
      (error => alert(error.message))
    )
  }

  public getBrands(){
    this.brandService.getBrands().subscribe(
      (response) => {
        this.brands = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onUpdateModel(editModel: NgForm){
    console.log(editModel.value.brand)
    let m:Model = {
      id: this.model.id,
      name: editModel.value.name,
      brand: editModel.value.brand
      
    }
    
    this.modelService.updateModel(m).subscribe(
      (response)=> {
        console.log(response)
      },
      (error:HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }

  public compareFn(y1: Brand, y2: Brand){
    return y1 && y2 ? y1.id === y2.id : y1 == y2;
  }

  public onCancel(){
    this.router.navigate(['/models'])
  }
}
