import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Unit } from "../models/unit";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class UnitService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getUnits(): Observable<Unit[]>{
        return this.http.get<Unit[]>(`${this.apiServerUrl}/units`);
    }

    public addUnit(unit: Unit): Observable<Unit>{
        return this.http.post<Unit>(`${this.apiServerUrl}/add-unit`, unit);
    }

    public getUnitById(id: number): Observable<Unit>{
        return this.http.get<Unit>(`${this.apiServerUrl}/units/${id}`);
    }

    public updateUnit(unit: Unit): Observable<Unit>{
        return this.http.put<Unit>(`${this.apiServerUrl}/update-unit`, unit);
    }

    public deleteUnit(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/units/delete/${id}`);
    }
}