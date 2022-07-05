import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ProductSupplier } from "../models/productsupplier";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class ProductSupplierService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getProductSuppliers(): Observable<ProductSupplier[]>{
        return this.http.get<ProductSupplier[]>(`${this.apiServerUrl}/productSuppliers`);
    }

    public getProductSuppliersPage(params: any): Observable<any>{
        return this.http.get<any>(`${this.apiServerUrl}/pagination-product-suppliers`, {params})
    }

    public addProductSupplier(productSupplier: ProductSupplier): Observable<ProductSupplier>{
        return this.http.post<ProductSupplier>(`${this.apiServerUrl}/add-productSupplier`, productSupplier);
    }

    public getProductSupplierById(id: number): Observable<ProductSupplier>{
        return this.http.get<ProductSupplier>(`${this.apiServerUrl}/productSuppliers/${id}`);
    }

    public updateProductSupplier(productSupplier: ProductSupplier): Observable<ProductSupplier>{
        return this.http.put<ProductSupplier>(`${this.apiServerUrl}/update-productSupplier`, productSupplier);
    }

    public deleteProductSupplier(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/productSuppliers/delete/${id}`);
    }
}