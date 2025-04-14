import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../interfacce/employee';
import { EmployeeService } from '../../service/employee.service';
import { NgForm } from '@angular/forms';
import { EmployeeResponse } from '../../interfacce/response/employee-response';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {
  @Output() employeeSaved = new EventEmitter<EmployeeResponse | undefined>();

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

  // Metodo per gestire il salvataggio del dipendente
  saveEmployee(form: NgForm): void {
    if (!form.valid) {
      // Se il form non è valido, emetti comunque l'evento per chiudere il form
      this.employeeSaved.emit();
      return;
    }

    // Se il form è valido, salva il dipendente
    this.employeeService.create(this.employee).subscribe({
      next: () => {
        this.employeeSaved.emit();  // Emette l'evento quando il dipendente è stato salvato
        this.router.navigate(['/home']);  // Redirige alla home dopo il salvataggio
      },
      error: err => {
        console.error('Errore nel salvataggio:', err);  // Gestione errore
      }
    });
  }
}
