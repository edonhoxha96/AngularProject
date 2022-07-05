import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Model } from 'src/app/models/model';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-models',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {
  private id!: number;
  public models!:Model[];
  public sortedModels:Map<String, Set<Model>> = new Map<String, Set<Model>>()

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modelService: ModelService,
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })

    this.modelService.getModelsByBrandId(this.id).subscribe(
      (response: Model[]) => {
        this.models = response;
        for (let i = 0; i < 26; i++){
          this.sortedModels.set((i+10).toString(36).toUpperCase(), new Set<Model>())
          }
        this.sortedModels.set("0-9", new Set<Model>())  
        
        this.models.forEach(m => {
          if(m.name.charAt(0).match('[0-9]')){
            this.sortedModels.set("0-9", this.sortedModels.get("0-9")!.add(m))
          }else{
            this.sortedModels.set(m.name.charAt(0).toUpperCase(), this.sortedModels.get(m.name.charAt(0).toUpperCase())!.add(m))
          }
        })  
        
        // let numMod: Set<Model> = new Set<Model>()
        // this.models.forEach(m => {
        //   if(m.name.charAt(0).match('[0-9]')){
        //     numMod.add(m);
        //   }
        // })
        // this.sortedModels.set("0-9", numMod)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      )  
  }

  // public hasValues(m: Set<Model>): boolean{
  //   if(m.size != 0){
  //     return true;
  //   }
  //   return false;
  // }
}
