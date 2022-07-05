import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.css']
})
export class EditBrandComponent implements OnInit {
  public brand!: Brand;
  public id!: number;
  constructor(private router: Router, private route:ActivatedRoute, private brandService:BrandService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })
    this.brandService.getBrandById(this.id).subscribe(
      (response)=>{
        this.brand = response;
      },
      (error: HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }

  public onUpdateBrand(editBrand: NgForm){
    let b:Brand = {
      id: editBrand.value.id,
      name: editBrand.value.name
    }
    this.brandService.updateBrand(b).subscribe(
      (response)=> {
        console.log(response)
      },
      (error:HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }

  public onCancel(){
    this.router.navigate(['/brands'])
  }

}
