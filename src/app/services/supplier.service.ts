import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Supplier } from "../models/supplier";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class SupplierService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getSuppliers(): Observable<Supplier[]>{
        return this.http.get<Supplier[]>(`${this.apiServerUrl}/suppliers`);
    }

    public addSupplier(supplier: Supplier): Observable<Supplier>{
        return this.http.post<Supplier>(`${this.apiServerUrl}/add-supplier`, supplier);
    }

    public getSupplierById(id: number): Observable<Supplier>{
        return this.http.get<Supplier>(`${this.apiServerUrl}/suppliers/${id}`);
    }

    public updateSupplier(supplier: Supplier): Observable<Supplier>{
        return this.http.put<Supplier>(`${this.apiServerUrl}/update-supplier`, supplier);
    }

    public deleteSupplier(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/suppliers/delete/${id}`);
    }
}   