import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Years } from 'src/app/models/years';
import { YearsService } from 'src/app/services/years.service';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css']
})
export class YearComponent implements OnInit {
  public years!: Years[];
  constructor(private yearsService: YearsService) { }

  ngOnInit(): void {
    this.getYears()
  }

  public getYears(){
    this.yearsService.getYears().subscribe(
      (response) => {
        this.years = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public deleteYear(id: number){
    if(confirm("Delete?")){
      this.yearsService.deleteYears(id).subscribe(
        () => {
          console.log("DELETED!");
          this.getYears();
        },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      )
    }
  }
}
