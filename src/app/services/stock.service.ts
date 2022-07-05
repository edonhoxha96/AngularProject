import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Stock } from "../models/stock";
import { environment } from "src/environments/environment";
import { query } from "@angular/animations";

@Injectable({
    providedIn: 'root'
})

export class StockService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getStocks(): Observable<Stock[]>{
        return this.http.get<Stock[]>(`${this.apiServerUrl}/stocks`);
    }

    public getStockById(id: number): Observable<Stock>{
        return this.http.get<Stock>(`${this.apiServerUrl}/stocks/${id}`);
    }

    public getStockByProduct(id: number): Observable<Stock[]>{
        return this.http.get<Stock[]>(`${this.apiServerUrl}/stockByProduct/${id}`);
    }

    public getStocksByModel(id: number): Observable<Stock[]>{
        //let param = new HttpParams().set("id", id);
        return this.http.get<Stock[]>(`${this.apiServerUrl}/stocksByModel/${id}`);
    }

    public addStock(stock: Stock): Observable<Stock>{
        return this.http.post<Stock>(`${this.apiServerUrl}/add-stock`, stock);
    }

    public updateStock(stock: Stock): Observable<Stock>{
        return this.http.put<Stock>(`${this.apiServerUrl}/update-stock`, stock)
    }

    public moveStock(stock: Stock, quantity: number): Observable<Stock>{
        console.log('SERVICE:')
        console.log('stock: ')
        console.log(stock)
        console.log('quantity: '+ quantity)
        const headers = new HttpHeaders().append('Content-Type','application/json');
        const params = new HttpParams().append('quantity', quantity)
        return this.http.post<Stock>(`${this.apiServerUrl}/move-stock`, stock, {headers: headers, params: params});
    }

    public moveSector(stock: Stock, quantity: number, secId: number): Observable<Stock>{
        const headers = new HttpHeaders().append('Content-Type','application/json');
        const params = new HttpParams().append('quantity', quantity).append('secId', secId)
        return this.http.post<Stock>(`${this.apiServerUrl}/move-sector`, stock, {headers: headers, params: params});
    }

    public getPaginationStock(params: any): Observable<any> {
        return this.http.get<any>(`${this.apiServerUrl}/pagination-stock`, {params});
    }
}