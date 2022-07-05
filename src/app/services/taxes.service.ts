import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Taxes } from "../models/taxes";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class TaxesService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getTaxes(): Observable<Taxes[]>{
        return this.http.get<Taxes[]>(`${this.apiServerUrl}/taxes`);
    }

    public addTaxes(taxes: Taxes): Observable<Taxes>{
        return this.http.post<Taxes>(`${this.apiServerUrl}/add-taxes`, taxes);
    }

    public getTaxesById(id: number): Observable<Taxes>{
        return this.http.get<Taxes>(`${this.apiServerUrl}/taxes/${id}`);
    }

    public updateTaxes(taxes: Taxes): Observable<Taxes>{
        return this.http.put<Taxes>(`${this.apiServerUrl}/update-taxes`, taxes);
    }

    public deleteTaxes(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/taxes/delete/${id}`);
    }
}