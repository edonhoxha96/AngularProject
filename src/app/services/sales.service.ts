import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Sales } from "../models/sales";
import { environment } from "src/environments/environment";
import { SalesPageData } from "../models/sales-page-data";

@Injectable({
    providedIn: 'root'
})

export class SalesService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getSaless(): Observable<Sales[]>{
        return this.http.get<Sales[]>(`${this.apiServerUrl}/sales`);
    }

    public getSaless2(): Observable<Sales[]>{
        return this.http.get<Sales[]>(`${this.apiServerUrl}/sales2`);
    }

    public addSales(sales: Sales): Observable<Sales>{
        return this.http.post<Sales>(`${this.apiServerUrl}/add-sales`, sales);
    }

    public addSales2(sales: Sales): Observable<Sales>{
        return this.http.post<Sales>(`${this.apiServerUrl}/add-sales2`, sales);
    }

    public getSalesById(id: number): Observable<Sales>{
        return this.http.get<Sales>(`${this.apiServerUrl}/sales/${id}`);
    }

    public updateSales(sales: Sales): Observable<Sales>{
        return this.http.put<Sales>(`${this.apiServerUrl}/update-sales`, sales);
    }

    public deleteSales(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/sales/delete/${id}`);
    }

    public deleteSales2(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/sales2/delete/${id}`);
    }

    public getSalesByDate(params: any): Observable<any>{
        return this.http.get<any>(`${this.apiServerUrl}/sales/date`, {params})
    }

    public getPaginationSales(params: any): Observable<any> {
        return this.http.get<any>(`${this.apiServerUrl}/pagination-sales`, {params});
    }
}   