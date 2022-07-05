import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { GlassBodyVariant } from "../models/glassbodyvariant";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class GlassBodyVariantService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getGlassBodyVariants(): Observable<GlassBodyVariant[]>{
        return this.http.get<GlassBodyVariant[]>(`${this.apiServerUrl}/glass-body-variants`);
    }

    public addGlassBodyVariant(glassBodyVariant: GlassBodyVariant): Observable<GlassBodyVariant>{
        return this.http.post<GlassBodyVariant>(`${this.apiServerUrl}/add-glass-body-variant`, glassBodyVariant);
    }

    public getGlassBodyVariantByProduct(id: number): Observable<GlassBodyVariant[]>{
        return this.http.get<GlassBodyVariant[]>(`${this.apiServerUrl}/glass-body-variants-by-product/${id}`)
    }

    public getGlassBodyVariantById(id: number): Observable<GlassBodyVariant>{
        return this.http.get<GlassBodyVariant>(`${this.apiServerUrl}/glass-body-variants/${id}`);
    }
    
    public updateGlassBodyVariant(gbv: GlassBodyVariant): Observable<GlassBodyVariant>{
        return this.http.put<GlassBodyVariant>(`${this.apiServerUrl}/update-glass-body-variant`, gbv);
    }

    public deleteGlassBodyVariant(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/glass-body-variants/delete/${id}`);
    }
}