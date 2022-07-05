import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Properties } from "../models/properties";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class PropertiesService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getPropertiess(): Observable<Properties[]>{
        return this.http.get<Properties[]>(`${this.apiServerUrl}/properties`);
    }

    public addProperties(properties: Properties): Observable<Properties>{
        return this.http.post<Properties>(`${this.apiServerUrl}/add-properties`, properties);
    }

    public getPropertiesById(id: number): Observable<Properties>{
        return this.http.get<Properties>(`${this.apiServerUrl}/properties/${id}`);
    }

    public updateProperties(properties: Properties): Observable<Properties>{
        return this.http.put<Properties>(`${this.apiServerUrl}/update-properties`, properties);
    }

    public deleteProperties(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/properties/delete/${id}`);
    }
}