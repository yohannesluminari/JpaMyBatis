// src/app/service/employee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { EmployeeResponse } from '../interfacce/response/employee-response';

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

  clearCache() {
    this.cache = null;
  }
}
