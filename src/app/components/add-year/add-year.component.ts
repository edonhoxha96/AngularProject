import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { YearsService } from 'src/app/services/years.service';

@Component({
  selector: 'app-add-year',
  templateUrl: './add-year.component.html',
  styleUrls: ['./add-year.component.css']
})
export class AddYearComponent implements OnInit {

  constructor(private yearsService: YearsService, private router: Router) { }

  ngOnInit(): void {
  }

  public onAddYear(addYear: NgForm){
    this.yearsService.addYears(addYear.value).subscribe(
      (response)=>{
        console.log(response)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }

  public onCancel(){
    this.router.navigate(['/year'])
  }
}
