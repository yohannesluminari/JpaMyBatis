import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { EmployeeResponse } from '../interfacce/response/employee-response';
import { Employee } from '../interfacce/employee';
import { Descrizione } from '../interfacce/descrizione';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesUrl = 'http://localhost:9090/api/employees';
  private descrizioneUrl = 'http://localhost:9090/api/descrizione';
  private cache: EmployeeResponse[] | null = null;

  constructor(private http: HttpClient) {}

  getAll(): Observable<EmployeeResponse[]> {
    if (this.cache) {
      return of(this.cache);
    }
    return this.http.get<EmployeeResponse[]>(this.employeesUrl).pipe(
      tap(data => this.cache = data)
    );
  }

  create(employee: Employee): Observable<EmployeeResponse> {
    return this.http.post<EmployeeResponse>(`${this.employeesUrl}/create`, employee);
  }


  delete(id: number): Observable<string> {
    return this.http.post(`${this.employeesUrl}/delete`, { id }, { responseType: 'text' }).pipe(
      tap(() => this.clearCache()) // Dopo il delete svuota la cache per forzare il ricaricamento
    );
  }


  getHobbies(): Observable<Descrizione[]> {
    return this.http.get<Descrizione[]>(`${this.descrizioneUrl}/code/hobbies`);
  }

  // Ottieni descrizioni per paesi
  getCountries(): Observable<Descrizione[]> {
    return this.http.get<Descrizione[]>(`${this.descrizioneUrl}/code/country`);
  }

  clearCache() {
    this.cache = null;
  }
}
