import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Country } from "../models/country";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class CountryService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getCountrys(): Observable<Country[]>{
        return this.http.get<Country[]>(`${this.apiServerUrl}/countries`);
    }

    public addCountry(country: Country): Observable<Country>{
        return this.http.post<Country>(`${this.apiServerUrl}/add-country`, country);
    }

    public getCountryById(id: number): Observable<Country>{
        return this.http.get<Country>(`${this.apiServerUrl}/countries/${id}`);
    }
    
    public updateCountry(country: Country): Observable<Country>{
        return this.http.put<Country>(`${this.apiServerUrl}/update-country`, country);
    }

    public deleteCountry(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/countries/delete/${id}`);
    }
}