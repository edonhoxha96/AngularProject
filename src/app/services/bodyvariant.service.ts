import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BodyVariant } from "../models/bodyvariant";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class BodyVariantService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getBodyVariants(): Observable<BodyVariant[]>{
        return this.http.get<BodyVariant[]>(`${this.apiServerUrl}/body-variants`);
    }

    public getBodyVariantById(id: number): Observable<BodyVariant>{
        return this.http.get<BodyVariant>(`${this.apiServerUrl}/body-variants/${id}`);
    }

    public addBodyVariant(bodyVariant: BodyVariant): Observable<BodyVariant>{
        return this.http.post<BodyVariant>(`${this.apiServerUrl}/add-body-variant`, bodyVariant);
    }

    public updateStatus(bodyvariant: BodyVariant): Observable<BodyVariant>{
        return this.http.put<BodyVariant>(`${this.apiServerUrl}/update-body-variant`, bodyvariant);
    }

    public deleteStatus(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/body-variants/delete/${id}`);
    }
}