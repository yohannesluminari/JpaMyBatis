import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeResponse } from './response/employee-response';
import { Employee } from './employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:9090/api/employees';

  constructor(private http: HttpClient) {}

  getAll(): Observable<EmployeeResponse[]> {
    return this.http.get<EmployeeResponse[]>(`${this.apiUrl}`);
  }

  getById(id: number): Observable<EmployeeResponse> {
    return this.http.get<EmployeeResponse>(`${this.apiUrl}/${id}`);
  }

  create(employee: Employee): Observable<EmployeeResponse> {
    return this.http.post<EmployeeResponse>(`${this.apiUrl}`, employee);
  }

  update(id: number, employee: Employee): Observable<EmployeeResponse> {
    return this.http.put<EmployeeResponse>(`${this.apiUrl}/${id}`, employee);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
