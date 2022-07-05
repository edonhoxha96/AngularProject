import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { GlassProperties } from "../models/glassproperties";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class GlassPropertiesService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getGlassPropertiess(): Observable<GlassProperties[]>{
        return this.http.get<GlassProperties[]>(`${this.apiServerUrl}/glass-properties`);
    }

    public addGlassProperties(glassProperties: GlassProperties): Observable<GlassProperties>{
        return this.http.post<GlassProperties>(`${this.apiServerUrl}/add-glass-properties`, glassProperties);
    }

    public getGlassPropertiesById(id: number): Observable<GlassProperties>{
        return this.http.get<GlassProperties>(`${this.apiServerUrl}/glass-properties/${id}`);
    }

    public getGlassPropertiesByProduct(id: number): Observable<GlassProperties[]>{
        return this.http.get<GlassProperties[]>(`${this.apiServerUrl}/glass-properties-by-product/${id}`);
    }
    
    public updateGlassProperties(gp: GlassProperties): Observable<GlassProperties>{
        return this.http.put<GlassProperties>(`${this.apiServerUrl}/update-glass-properties`, gp);
    }

    public deleteGlassProperties(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/glass-properties/delete/${id}`);
    }
}