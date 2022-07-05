import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Sector } from 'src/app/models/sector';
import { SectorService } from 'src/app/services/sector.service';

@Component({
  selector: 'app-edit-sector',
  templateUrl: './edit-sector.component.html',
  styleUrls: ['./edit-sector.component.css']
})
export class EditSectorComponent implements OnInit {
  public sector!: Sector;
  public id!: number;

  constructor(private router: Router, private route:ActivatedRoute, private sectorService: SectorService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })
    this.sectorService.getSectorById(this.id).subscribe(
      (response) => {
        this.sector = response;
      },
      (error: HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }

  public onUpdateSector(editSector: NgForm){
    this.sectorService.updateSector(editSector.value).subscribe(
      (response) => {
        console.log(response)
      },
      (error:HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }

  public onCancel(){
    this.router.navigate(['/sectors'])
  }
}
