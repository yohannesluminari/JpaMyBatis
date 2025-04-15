import { Component, OnInit } from '@angular/core';
import { EmployeeResponse } from '../../interfacce/response/employee-response';
import { EmployeeService } from '../../service/employee.service';
import { Categoria } from '../../interfacce/categoria';
import { Ruolo } from '../../interfacce/ruolo';
import { CategoriaService } from '../../service/categoria.service';
import { ContrattoService } from '../../service/contratto.service';
import { RuoloService } from '../../service/ruolo.service';
import { Contratto } from '../../interfacce/contratto';


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

  contrattoFormVisible: boolean = false;
  selectedEmployeeId: number | null = null;

  contractDetailsModalVisible: boolean = false;
  selectedContratto: Contratto | null = null;

// Oggetti per form
ruoli: Ruolo[] = [];
categorie: Categoria[] = [];
nuovoContratto: any = {
  dataAssunzione: '',
  dataDimissione: '',
  stipendio: 0,
  status: true,
  idRuolo: null,
  idCategoria: null
};
  constructor(  private employeeService: EmployeeService,
    private contrattoService: ContrattoService,
    private ruoloService: RuoloService,
    private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadDropdowns();
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

  loadDropdowns(): void {
    this.ruoloService.getAll().subscribe(res => {
      this.ruoli = res.map(r => ({
        idRuolo: r.idRuolo,    // Usa idRuolo
        descrizione: r.descrizione
      }));
    });

    this.categoriaService.getAll().subscribe(res => {
      this.categorie = res.map(c => ({
        idCategoria: c.idCategoria,    // Usa idCategoria
        tipo: c.tipo
      }));
    });
  }

  showContrattoForm(empId: number): void {
    this.selectedEmployeeId = empId;
    this.contrattoFormVisible = true;
    this.nuovoContratto = {
      dataAssunzione: '',
      dataDimissione: '',
      stipendio: 0,
      status: true,
      idRuolo: null,
      idCategoria: null
    };
  }

  submitContratto(): void {
    if (this.selectedEmployeeId !== null) {
      this.contrattoService.addContrattoToEmployee(this.selectedEmployeeId, this.nuovoContratto).subscribe({
        next: () => {
          this.contrattoFormVisible = false;
          this.selectedEmployeeId = null;
          this.loadEmployees(); // aggiorna la tabella
        },
        error: err => console.error('Errore aggiunta contratto', err)
      });
    }
  }

  showContractDetails(empId: number): void {
    this.selectedEmployeeId = empId;
    this.contrattoService.getContrattoByEmployeeId(empId).subscribe({
      next: (data) => {
        this.selectedContratto = data;
        this.contractDetailsModalVisible = true; // Mostra la modale
      },
      error: (err) => {
        console.error('Errore nel caricamento del contratto', err);
      }
    });
  }

  closeContractDetailsModal(): void {
    this.contractDetailsModalVisible = false;
    this.selectedContratto = null; // Reset dei dettagli
  }
}

