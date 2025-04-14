import { Component, OnInit } from '@angular/core';
import { EmployeeResponse } from '../../interfacce/response/employee-response';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  employees: EmployeeResponse[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getAll().subscribe({
      next: (data) => this.employees = data,
      error: (err) => console.error('Errore caricamento dati', err)
    });
  }
}
