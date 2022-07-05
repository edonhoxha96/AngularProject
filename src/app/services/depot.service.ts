import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Depot } from "../models/depot";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class DepotService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getDepots(): Observable<Depot[]>{
        return this.http.get<Depot[]>(`${this.apiServerUrl}/depots`);
    }

    public addDepot(depot: Depot): Observable<Depot>{
        return this.http.post<Depot>(`${this.apiServerUrl}/add-depot`, depot);
    }

    public getDepotById(id: number): Observable<Depot>{
        return this.http.get<Depot>(`${this.apiServerUrl}/depots/${id}`);
    }
    
    public updateDepot(brand: Depot): Observable<Depot>{
        return this.http.put<Depot>(`${this.apiServerUrl}/update-depot`, brand);
    }

    public deleteDepot(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/depots/delete/${id}`);
    }
}