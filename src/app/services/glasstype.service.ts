import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { GlassType } from "../models/glasstype";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class GlassTypeService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getGlassTypes(): Observable<GlassType[]>{
        return this.http.get<GlassType[]>(`${this.apiServerUrl}/glass-types`);
    }

    public addGlassType(glassType: GlassType): Observable<GlassType>{
        return this.http.post<GlassType>(`${this.apiServerUrl}/add-glass-type`, glassType);
    }

    public getGlassTypeById(id: number): Observable<GlassType>{
        return this.http.get<GlassType>(`${this.apiServerUrl}/glass-types/${id}`);
    }

public updateGlassType(glassType: GlassType): Observable<GlassType>{
        return this.http.put<GlassType>(`${this.apiServerUrl}/update-glass-type`, glassType);
    }

    public deleteGlassType(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/glass-types/delete/${id}`);
    }
}