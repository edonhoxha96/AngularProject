import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Years } from "../models/years";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class YearsService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getYears(): Observable<Years[]>{
        return this.http.get<Years[]>(`${this.apiServerUrl}/years`);
    }

    public getYearsByModel(id: number): Observable<Years[]>{
        return this.http.get<Years[]>(`${this.apiServerUrl}/years/model/${id}`);
    }

    public addYears(years: Years): Observable<Years>{
        return this.http.post<Years>(`${this.apiServerUrl}/add-years`, years);
    }

    public getYearsById(id: number): Observable<Years>{
        return this.http.get<Years>(`${this.apiServerUrl}/years/${id}`);
    }

    public updateYears(years: Years): Observable<Years>{
        return this.http.put<Years>(`${this.apiServerUrl}/update-years`, years);
    }

    public deleteYears(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/years/delete/${id}`);
    }
}