import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../models/product";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class ProductService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getProducts(): Observable<Product[]>{
        return this.http.get<Product[]>(`${this.apiServerUrl}/products`);
    }

    public addProduct(product: Product): Observable<Product>{
        return this.http.post<Product>(`${this.apiServerUrl}/add-product`, product);
    }

    public getProductsByModel(id: number): Observable<Product[]>{
        return this.http.get<Product[]>(`${this.apiServerUrl}/productsByModel/${id}`);
    }

    public getProductsByEurocode(eurocode: string): Observable<Product[]>{
        return this.http.get<Product[]>(`${this.apiServerUrl}/productsByEurocode/${eurocode}`);
    }
    
    public getProductsByModelAndYear(modelid: number, yearid: number): Observable<Product[]>{
        return this.http.get<Product[]>(`${this.apiServerUrl}/productsByModelAndYear/${modelid}/${yearid}`);
    }

    public getProductById(id: number): Observable<Product>{
        return this.http.get<Product>(`${this.apiServerUrl}/products/${id}`);
    }

    public updateProduct(product: Product): Observable<Product>{
        return this.http.put<Product>(`${this.apiServerUrl}/update-product`, product);
    }

    public deleteProduct(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/products/delete/${id}`);
    }
}