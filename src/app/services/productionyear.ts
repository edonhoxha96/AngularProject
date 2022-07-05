import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ProductionYear } from "../models/productionyear";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class ProductionYearService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getProductionYears(): Observable<ProductionYear[]>{
        return this.http.get<ProductionYear[]>(`${this.apiServerUrl}/production-years`);
    }

    public addProductionYear(productionYear: ProductionYear): Observable<ProductionYear>{
        return this.http.post<ProductionYear>(`${this.apiServerUrl}/add-production-year`, productionYear);
    }
}