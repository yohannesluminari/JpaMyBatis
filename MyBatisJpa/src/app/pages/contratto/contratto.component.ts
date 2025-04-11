import { Component, OnInit } from '@angular/core';
import { ContrattoService } from '../../service/contratto.service';
import { Contratto } from '../../interfacce/contratto';

@Component({
  selector: 'app-contratto',
  templateUrl: './contratto.component.html',
  styleUrl: './contratto.component.css'
})
export class ContrattoComponent implements OnInit {
  contratti: Contratto[] = [];

  constructor(private contrattoService: ContrattoService) {}

  ngOnInit(): void {
    this.contrattoService.getContratti().subscribe({
      next: (data) => this.contratti = data,
      error: (err) => console.error('Errore nel recupero dei contratti:', err)
    });
  }
}
