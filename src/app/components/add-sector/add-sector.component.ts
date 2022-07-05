import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SectorService } from 'src/app/services/sector.service';

@Component({
  selector: 'app-add-sector',
  templateUrl: './add-sector.component.html',
  styleUrls: ['./add-sector.component.css']
})
export class AddSectorComponent implements OnInit {
  message!: string;
  errorMessage!: string;
  constructor(private sectorService: SectorService, private router: Router) { }

  ngOnInit(): void {
  }

  public onAddSector(addSector: NgForm){
    this.sectorService.addSector(addSector.value).subscribe(
      (response)=>{
        this.message = "Sector '" + response.name + "' saved successfully!"
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
    this.router.navigate(['/sectors'])
  }

}
