import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Sector } from "../models/sector";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class SectorService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getSectors(): Observable<Sector[]>{
        return this.http.get<Sector[]>(`${this.apiServerUrl}/sectors`);
    }

    public addSector(sector: Sector): Observable<Sector>{
        return this.http.post<Sector>(`${this.apiServerUrl}/add-sector`, sector);
    }
   
    public getSectorById(id: number): Observable<Sector>{
        return this.http.get<Sector>(`${this.apiServerUrl}/sectors/${id}`);
    }

    public updateSector(sector: Sector): Observable<Sector>{
        return this.http.put<Sector>(`${this.apiServerUrl}/update-sector`, sector);
    }

    public deleteSector(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/sectors/delete/${id}`);
    }
}