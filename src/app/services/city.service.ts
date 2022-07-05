import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { City } from "../models/city";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class CityService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getCitys(): Observable<City[]>{
        return this.http.get<City[]>(`${this.apiServerUrl}/cities`);
    }

    public addCity(city: City): Observable<City>{
        return this.http.post<City>(`${this.apiServerUrl}/add-city`, city);
    }

    public getCityById(id: number): Observable<City>{
        return this.http.get<City>(`${this.apiServerUrl}/cities/${id}`);
    }

    public updateCity(city: City): Observable<City>{
        return this.http.put<City>(`${this.apiServerUrl}/update-city`, city);
    }

    public deleteCity(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/cities/delete/${id}`);
    }       
}   