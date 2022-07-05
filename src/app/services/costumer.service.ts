import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Costumer } from "../models/costumer";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class CostumerService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getCostumers(): Observable<Costumer[]>{
        return this.http.get<Costumer[]>(`${this.apiServerUrl}/costumers`);
    }

    public addCostumer(costumer: Costumer): Observable<Costumer>{
        return this.http.post<Costumer>(`${this.apiServerUrl}/add-costumer`, costumer);
    }

    public getCostumerById(id: number): Observable<Costumer>{
        return this.http.get<Costumer>(`${this.apiServerUrl}/costumers/${id}`);
    }
    
    public updateCostumer(costumer: Costumer): Observable<Costumer>{
        return this.http.put<Costumer>(`${this.apiServerUrl}/update-costumer`, costumer);
    }

    public deleteCostumer(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/costumers/delete/${id}`);
    }
}   