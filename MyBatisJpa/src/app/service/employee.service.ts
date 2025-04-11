import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { EmployeeResponse } from '../interfacce/response/employee-response';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesCache: EmployeeResponse[] | null = null;
  private employeesUrl = 'http://localhost:9090/api/employees';
  constructor(private http: HttpClient) {}

  getAll(): Observable<EmployeeResponse[]> {
    if (this.employeesCache) {
      return of(this.employeesCache); // restituisco dati in cache
    } else {
      return this.http.get<EmployeeResponse[]>('http://localhost:9090/api/employees').pipe(
        tap(data => this.employeesCache = data) // salvo in cache
      );
    }
  }

  clearCache(): void {
    this.employeesCache = null;
  }
}


