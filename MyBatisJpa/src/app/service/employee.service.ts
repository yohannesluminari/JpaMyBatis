import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { EmployeeResponse } from '../interfacce/response/employee-response';
import { Employee } from '../interfacce/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesUrl = 'http://localhost:9090/api/employees';
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

  create(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.employeesUrl}/create`, employee).pipe(
      tap(() => this.clearCache()) // Dopo il create svuota la cache per forzare il ricaricamento
    );
  }

  delete(id: number): Observable<string> {
    return this.http.post(`${this.employeesUrl}/delete`, { id }, { responseType: 'text' }).pipe(
      tap(() => this.clearCache()) // Dopo il delete svuota la cache per forzare il ricaricamento
    );
  }

  clearCache() {
    this.cache = null;
  }
}
