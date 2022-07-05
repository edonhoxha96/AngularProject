import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Brand } from "../models/brand";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class BrandService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getBrands(): Observable<Brand[]>{
        return this.http.get<Brand[]>(`${this.apiServerUrl}/brands`);
    }

    public getBrandById(id: number): Observable<Brand>{
        return this.http.get<Brand>(`${this.apiServerUrl}/brands/${id}`);
    }

    public addBrand(brand: Brand): Observable<Brand>{
        return this.http.post<Brand>(`${this.apiServerUrl}/add-brand`, brand);
    }

    public updateBrand(brand: Brand): Observable<Brand>{
        return this.http.put<Brand>(`${this.apiServerUrl}/update-brand`, brand);
    }

    public deleteBrand(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/brands/delete/${id}`);
    }

    public getPaginationStock(params: any): Observable<any> {
        return this.http.get<any>(`${this.apiServerUrl}/pagination-brands`, {params});
    }
}