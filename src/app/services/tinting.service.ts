import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Tinting } from "../models/tinting";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class TintingService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getTintings(): Observable<Tinting[]>{
        return this.http.get<Tinting[]>(`${this.apiServerUrl}/tintings`);
    }

    public addTinting(tinting: Tinting): Observable<Tinting>{
        return this.http.post<Tinting>(`${this.apiServerUrl}/add-tinting`, tinting);
    }

    public getTintingById(id: number): Observable<Tinting>{
        return this.http.get<Tinting>(`${this.apiServerUrl}/tintings/${id}`);
    }

    public updateTinting(tinting: Tinting): Observable<Tinting>{
        return this.http.put<Tinting>(`${this.apiServerUrl}/update-tinting`, tinting);
    }

    public deleteTinting(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/tintings/delete/${id}`);
    }
}