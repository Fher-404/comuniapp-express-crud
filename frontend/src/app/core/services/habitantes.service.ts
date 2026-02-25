import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' }) // servicio con patron singlenton (una sola instancia) que esta disponible en toda la app
export class HabitantesService {

private baseUrl = 'http://localhost:3000/habitantes'; // Servidor de backend para hacer las peticiones al servidor

constructor(private http: HttpClient) {} //Acceder a metodos como get post put y delete

// Observable es básicamente una función que produce valores a lo largo del tiempo y solo comienza a ejecutarse cuando alguien se suscribe con .suscribe()
getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getall`);
}

getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getone/${id}`);
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

getBySector(sector: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/sector/${sector}`);
}
}