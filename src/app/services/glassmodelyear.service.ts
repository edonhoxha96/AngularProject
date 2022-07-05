import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { GlassModelYear } from "../models/glassmodelyear";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class GlassModelYearService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getGlassModelYears(): Observable<GlassModelYear[]>{
        return this.http.get<GlassModelYear[]>(`${this.apiServerUrl}/glass-model-years`);
    }

    public addGlassModelYear(glassModelYear: GlassModelYear): Observable<GlassModelYear>{
        return this.http.post<GlassModelYear>(`${this.apiServerUrl}/add-glass-model-year`, glassModelYear);
    }

    public getGlassModelYearById(id: number): Observable<GlassModelYear>{
        return this.http.get<GlassModelYear>(`${this.apiServerUrl}/glass-model-years/${id}`);
    }

    // public updateGlassModelYear(brand: GlassModelYear): Observable<GlassModelYear>{
    //     return this.http.put<GlassModelYear>(`${this.apiServerUrl}/update-brand`, brand);
    // }

    public deleteGlassModelYear(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/glass-model-years/delete/${id}`);
    }
}