import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContrattoService {

  private apiUrl = ' http://localhost:9090/api/contratti';

  constructor(private http: HttpClient) { }

  // Metodo per ottenere la lista dei contratti
  getContratti(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

}
