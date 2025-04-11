import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../interfacce/descrizione';
import { EmployeeResponse } from '../../interfacce/response/employee-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  employees: EmployeeResponse[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }


  getEmployees(): void {
    this.employeeService.getAll().subscribe({
      next: (data) => this.employees = data,
      error: (err) => console.error('Errore nel recupero degli employee:', err)
    });
  }
}
