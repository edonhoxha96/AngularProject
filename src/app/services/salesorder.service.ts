import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SalesOrder } from "../models/salesorder";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class SalesOrderService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getSalesOrders(): Observable<SalesOrder[]>{
        return this.http.get<SalesOrder[]>(`${this.apiServerUrl}/salesOrders`);
    }

    public addSalesOrder(salesOrder: SalesOrder): Observable<SalesOrder>{
        return this.http.post<SalesOrder>(`${this.apiServerUrl}/add-salesOrder`, salesOrder);
    }

    public getSalesOrderById(id: number): Observable<SalesOrder>{
        return this.http.get<SalesOrder>(`${this.apiServerUrl}/salesOrders/${id}`);
    }

    public updateSalesOrder(salesOrder: SalesOrder): Observable<SalesOrder>{
        return this.http.put<SalesOrder>(`${this.apiServerUrl}/update-salesOrder`, salesOrder);
    }

    public deleteSalesOrder(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/salesOrders/delete/${id}`);
    }
}