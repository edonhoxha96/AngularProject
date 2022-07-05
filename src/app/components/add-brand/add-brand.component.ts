import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {
  message!: string
  errorMessage!: string

  constructor(private brandService: BrandService, private router: Router) { }

  ngOnInit(): void {
  }

  public onAddBrand(addBrand: NgForm){
    this.brandService.addBrand(addBrand.value).subscribe(
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
    this.router.navigate(['/brands'])
  }
}
