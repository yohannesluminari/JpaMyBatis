import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../interfacce/employee';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {
  employee: Employee = {
    fullname: '',
    email: '',
    gender: '',
    address: '',
    hobbyId: 0,
    countryId: 0,
    contrattoId: undefined
  };

  constructor(private employeeService: EmployeeService, private router: Router) {}

  saveEmployee(): void {
    this.employeeService.create(this.employee).subscribe({
      next: () => this.router.navigate(['/home']),
      error: err => console.error('Errore nel salvataggio:', err)
    });
  }
}
