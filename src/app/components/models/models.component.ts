import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Model } from 'src/app/models/model';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {
  public models!:Model[]
  constructor(private modelService: ModelService) { }

  ngOnInit(): void {
    this.getModels()
  }

  public getModels(){
    this.modelService.getModels().subscribe(
      (response) => {
        this.models = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public deleteModel(id: number){
    if(confirm("Delete?")){
      this.modelService.deleteModel(id).subscribe(
        (res) => {
          console.log("DELETED!")
          this.getModels()
        },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      )
    }
  }
}
