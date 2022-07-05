import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Sector } from 'src/app/models/sector';
import { SectorService } from 'src/app/services/sector.service';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.css']
})
export class SectorsComponent implements OnInit {
  public sectors!: Sector[];
  constructor(private sectorService: SectorService) { }

  ngOnInit(): void {
    this.getSectors();
  }

  public getSectors(){
    this.sectorService.getSectors().subscribe(
      (response) => {
        this.sectors = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public deleteSector(id: number){
    if(confirm("Delete?")){
      this.sectorService.deleteSector(id).subscribe(
        (response) => {
          console.log("DELETED!");
          this.getSectors();
        },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      )
    }
  }
}
