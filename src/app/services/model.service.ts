import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Model } from "../models/model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class ModelService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getModels(): Observable<Model[]>{
        return this.http.get<Model[]>(`${this.apiServerUrl}/models`);
    }

    public getModelsByBrandId(id: number): Observable<Model[]>{
        return this.http.get<Model[]>(`${this.apiServerUrl}/models/brand/${id}`);
    }

    public addModel(model: Model): Observable<Model>{
        return this.http.post<Model>(`${this.apiServerUrl}/add-model`, model);
    }

    public getModelById(id: number): Observable<Model>{
        return this.http.get<Model>(`${this.apiServerUrl}/models/${id}`);
    }

    public updateModel(model: Model): Observable<Model>{
        return this.http.put<Model>(`${this.apiServerUrl}/update-model`, model);
    }

    public deleteModel(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/models/delete/${id}`);
    }       
}