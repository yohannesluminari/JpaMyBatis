import { Component, OnInit } from '@angular/core';
import { ContrattoService } from '../../service/contratto.service';

@Component({
  selector: 'app-contratto',
  templateUrl: './contratto.component.html',
  styleUrl: './contratto.component.css'
})
export class ContrattoComponent implements OnInit {

  contratti: any[] = [];

  constructor(private contrattoService: ContrattoService) { }

  ngOnInit(): void {

    this.contrattoService.getContratti().subscribe(
      (data) => {
        this.contratti = data;
      },
      (error) => {
        console.error('Errore nel recupero dei contratti', error);
      }
    );
  }
}
