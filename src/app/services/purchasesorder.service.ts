import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PurchasesOrder } from "../models/purchasesorder";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class PurchasesOrderService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getPurchasesOrders(): Observable<PurchasesOrder[]>{
        return this.http.get<PurchasesOrder[]>(`${this.apiServerUrl}/purchasesOrders`);
    }

    public addPurchasesOrder(purchasesOrder: PurchasesOrder): Observable<PurchasesOrder>{
        return this.http.post<PurchasesOrder>(`${this.apiServerUrl}/add-purchasesOrder`, purchasesOrder);
    }

    public getPurchasesOrderById(id: number): Observable<PurchasesOrder>{
        return this.http.get<PurchasesOrder>(`${this.apiServerUrl}/purchasesOrders/${id}`);
    }

    public updatePurchasesOrder(purchasesOrder: PurchasesOrder): Observable<PurchasesOrder>{
        return this.http.put<PurchasesOrder>(`${this.apiServerUrl}/update-purchasesOrder`, purchasesOrder);
    }

    public deletePurchasesOrder(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/purchasesOrders/delete/${id}`);
    }
}