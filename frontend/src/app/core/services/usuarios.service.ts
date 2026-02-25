import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsuariosService {

private baseUrl = 'http://localhost:3000/usuarios';

constructor(private http: HttpClient) {}

getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getall`);
}

getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
}

create(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
}

update(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
}

delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
}

getByRol(rol: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/rol/${rol}`);
}
}