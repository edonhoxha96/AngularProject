import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Years } from 'src/app/models/years';
import { YearsService } from 'src/app/services/years.service';

@Component({
  selector: 'app-years',
  templateUrl: './years.component.html',
  styleUrls: ['./years.component.css']
})
export class YearsComponent implements OnInit {
  private id!: number;
  public years!:Years[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private yearsService: YearsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })

    this.yearsService.getYearsByModel(this.id).subscribe(
      (response:Years[]) => {
        this.years = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public nextStep(id:number){
    var modelid = this.id;
    var yearid = id
    this.router.navigate(['/products', modelid, yearid]);
  }
}
