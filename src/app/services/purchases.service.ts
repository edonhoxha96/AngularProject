import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Purchases } from "../models/purchases";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class PurchasesService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getPurchasess(): Observable<Purchases[]>{
        return this.http.get<Purchases[]>(`${this.apiServerUrl}/purchases`);
    }

    public addPurchases(purchases: Purchases): Observable<Purchases>{
        return this.http.post<Purchases>(`${this.apiServerUrl}/add-purchases`, purchases);
    }
    public getPurchasesById(id: number): Observable<Purchases>{
        return this.http.get<Purchases>(`${this.apiServerUrl}/purchases/${id}`);
    }

    public updatePurchases(purchases: Purchases): Observable<Purchases>{
        return this.http.put<Purchases>(`${this.apiServerUrl}/update-purchases`, purchases);
    }

    public deletePurchases(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/purchases/delete/${id}`);
    }
}   