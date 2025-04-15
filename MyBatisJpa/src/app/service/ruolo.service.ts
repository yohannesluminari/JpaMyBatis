import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ruolo } from '../interfacce/ruolo';

@Injectable({ providedIn: 'root' })
export class RuoloService {
  private apiUrl = 'http://localhost:9090/api/ruoli'; // Cambia se è diverso

  constructor(private http: HttpClient) {}

  getAll(): Observable<Ruolo[]> {
    return this.http.get<Ruolo[]>(this.apiUrl);
  }
}
