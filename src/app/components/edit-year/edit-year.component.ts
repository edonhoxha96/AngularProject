import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Years } from 'src/app/models/years';
import { YearsService } from 'src/app/services/years.service';

@Component({
  selector: 'app-edit-year',
  templateUrl: './edit-year.component.html',
  styleUrls: ['./edit-year.component.css']
})
export class EditYearComponent implements OnInit {
  public year!: Years
  private id!: number
  constructor(private router: Router, private route:ActivatedRoute, private yearsService: YearsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })
    this.yearsService.getYearsById(this.id).subscribe(
      (response) => {
        this.year = response
      },
      (error: HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }

  public onUpdateYear(editYear: NgForm){
    this.yearsService.updateYears(editYear.value).subscribe(
      (response) => {
        console.log(response)
      },
      (error:HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }

  public onCancel(){
    this.router.navigate(['/year'])
  }
}
