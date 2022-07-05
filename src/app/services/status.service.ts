import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Status } from "../models/status";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class StatusService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getStatus(): Observable<Status[]>{
        return this.http.get<Status[]>(`${this.apiServerUrl}/statuses`);
    }
    public getStatusById(id: number): Observable<Status>{
        return this.http.get<Status>(`${this.apiServerUrl}/statuses/${id}`);
    }

    public addStatus(status: Status): Observable<Status>{
        return this.http.post<Status>(`${this.apiServerUrl}/add-status`, status);
    }

    public updateStatus(status: Status): Observable<Status>{
        return this.http.put<Status>(`${this.apiServerUrl}/update-status`, status);
    }

    public deleteStatus(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/statuses/delete/${id}`);
    }
}   