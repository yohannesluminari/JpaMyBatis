import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../interfacce/employee';
import { EmployeeService } from '../../service/employee.service';
import { NgForm } from '@angular/forms';
import { EmployeeResponse } from '../../interfacce/response/employee-response';
import { Descrizione } from '../../interfacce/descrizione';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent  implements OnInit{
  @Output() employeeSaved = new EventEmitter<EmployeeResponse | undefined>();


  hobbies: Descrizione[] = []; // Lista di hobby
  countries: Descrizione[] = [];

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


  ngOnInit(): void {
    // Carica hobby e paesi dal backend
    this.employeeService.getHobbies().subscribe({
      next: (data) => {
        this.hobbies = data;
      },
      error: (err) => {
        console.error('Errore nel caricamento degli hobby:', err);
      }
    });

    this.employeeService.getCountries().subscribe({
      next: (data) => {
        this.countries = data;
      },
      error: (err) => {
        console.error('Errore nel caricamento dei paesi:', err);
      }
    });
  }

  saveEmployee(form: NgForm): void {
    if (!form.valid) {
      this.employeeSaved.emit();
      return;
    }

    // Debug: stampa i dati prima di inviarli
    console.log('Dati dipendente:', this.employee);

    // Assicurati che hobbyId e countryId siano numeri
    const selectedHobby = this.hobbies.find(h => h.valore === this.employee.hobbyId.toString());
    const selectedCountry = this.countries.find(c => c.valore === this.employee.countryId.toString());

    // Converti i valori selezionati in ID per hobby e paese
    this.employee.hobbyId = selectedHobby ? selectedHobby.id : 0;
    this.employee.countryId = selectedCountry ? selectedCountry.id : 0;

    console.log('Dati dipendente (con ID di hobby e paese):', this.employee);

    // Salva il dipendente
    this.employeeService.create(this.employee).subscribe({
      next: () => {
        this.employeeSaved.emit();
        this.router.navigate(['/home']);
      },
      error: err => {
        console.error('Errore nel salvataggio:', err);
      }
    });
  }

}
