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

  showDeleteModal(id: number): void {
    this.deleteCandidateId = id;
    this.confirmModalVisible = true;
  }

  cancelDelete(): void {
    this.confirmModalVisible = false;
    this.deleteCandidateId = null;
  }

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

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  onEmployeeSaved(): void {
    this.isFormVisible = false;
    this.loadEmployees();
  }
}
