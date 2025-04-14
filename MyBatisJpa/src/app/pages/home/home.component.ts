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
  isFormVisible: boolean = false;

  confirmModalVisible: boolean = false;
  deleteCandidateId: number | null = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  // Carica i dipendenti
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

  // Funzione per aggiungere un nuovo dipendente
  addEmployee(employee: EmployeeResponse): void {
    this.employees.push(employee); // Aggiungi il nuovo dipendente nell'array
  }

  // Mostra la finestra di conferma per eliminare un dipendente
  showDeleteModal(id: number): void {
    this.deleteCandidateId = id;
    this.confirmModalVisible = true;
  }

  // Annulla l'eliminazione
  cancelDelete(): void {
    this.confirmModalVisible = false;
    this.deleteCandidateId = null;
  }

  // Conferma l'eliminazione di un dipendente
  confirmDelete(): void {
    if (this.deleteCandidateId !== null) {
      this.employeeService.delete(this.deleteCandidateId).subscribe({
        next: () => {
          this.loadEmployees();
          this.confirmModalVisible = false;
          this.deleteCandidateId = null;
        },
        error: (err) => {
          console.error('Errore durante l\'eliminazione', err);
          this.confirmModalVisible = false;
        }
      });
    }
  }

  // Mostra o nasconde il form per aggiungere un dipendente
  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  // Gestisce l'evento quando un dipendente è stato salvato (add o update)
  onEmployeeSaved(employee?: EmployeeResponse): void {
    if (employee) {
      // Se il dipendente è stato salvato, aggiungilo nella lista
      this.addEmployee(employee);
    }
    this.isFormVisible = false;
    this.loadEmployees();  // Ricarica i dipendenti dopo ogni operazione di CRUD
  }
}
