import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contratto } from '../interfacce/contratto';

@Injectable({
  providedIn: 'root'
})
export class ContrattoService {

  private apiUrl = 'http://localhost:9090/api/contratti';

  constructor(private http: HttpClient) {}

  getContratti(): Observable<Contratto[]> {
    return this.http.get<Contratto[]>(this.apiUrl);
  }

  addContrattoToEmployee(employeeId: number, contratto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addContract/${employeeId}`, contratto);
  }


}
