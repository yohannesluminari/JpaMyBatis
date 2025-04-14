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
  isFormVisible: boolean = false;  // Variabile per controllare la visibilità del form

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  // Carica la lista dei dipendenti
  loadEmployees(): void {
    this.employeeService.getAll().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => {
        console.error('Errore nel caricamento dipendenti', err);
      }
    });
  }

  // Mostra o nasconde il form
  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  // Gestisce l'evento quando un dipendente è stato salvato
  onEmployeeSaved(): void {
    this.isFormVisible = false;  // Nasconde il form
    this.loadEmployees();        // Ricarica la lista dei dipendenti
  }
}
