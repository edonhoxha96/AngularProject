import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Model } from 'src/app/models/model';
import { BrandService } from 'src/app/services/brand.service';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.css']
})
export class AddModelComponent implements OnInit {
  public brands!:Brand[];
  public selectedBrand!:Brand;
  message!: string
  errorMessage!: string
  constructor(private modelService: ModelService, private brandService: BrandService, private router: Router) { }

  ngOnInit(): void {
    this.brandService.getBrands().subscribe(
      (response) => {
        this.brands = response
      },
      (error => alert(error.message))
    )
  }

  public onAddModel(addModel: NgForm){
    let m: Model = {
      id: 0,
      name: addModel.value.name,
      brand:{
        id: addModel.value.brand,
        name:""
      }
    }
    this.modelService.addModel(m).subscribe(
      (response)=>{
        this.message = "Saved successfully!"
        this.errorMessage = ""
      },
      (error: HttpErrorResponse) =>{
        this.errorMessage = error.error.message
        this.message = ""
        console.log(error.error.statusCode);
        // console.log(error.message);
      }
    )
  }

  public onCancel(){
    this.router.navigate(['/models'])
  }
}
