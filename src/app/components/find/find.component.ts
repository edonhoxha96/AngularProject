import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent implements OnInit {
  public brands!: Brand[];
  public sortedBrands: Map<String, Set<Brand>> = new Map<String, Set<Brand>>()

  constructor(private brandService: BrandService,) { }

  ngOnInit(): void {
     this.brandService.getBrands().subscribe(
      (response: Brand[]) => {
        this.brands = response;
        for (let i = 0; i < 26; i++){
          this.sortedBrands.set((i+10).toString(36).toUpperCase(), new Set<Brand>())
        }
        this.brands.forEach(b =>{
          this.sortedBrands.set(b.name.charAt(0).toUpperCase(), this.sortedBrands.get(b.name.charAt(0).toUpperCase())!.add(b))
        })
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )

  }

  public sortAlph(){
    
    for (let i = 0; i < 26; i++) {
      var li = document.createElement("li");
      li.innerHTML =  (i+10).toString(36).toUpperCase() + " ";
      this.brands.forEach(b => {
        if(b.name.toLowerCase().startsWith((i+10).toString(36))){
          li.innerHTML += b.name;
        }
      });
      li.style.listStyle = "none";
      li.style.display = "inline";
      document.getElementById("letter-main")!.appendChild(li);
    }
    
  }
}
