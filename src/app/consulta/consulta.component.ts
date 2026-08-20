import { CommonModule } from '@angular/common';
import { Component, inject, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ClientService } from '../services/client.service';
import { Client } from '../cadastro/client';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-consulta',
  imports: [
    FormsModule,
    FlexLayoutModule,
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit {

  private readonly dialog = inject(MatDialog);

  clientList: Client[] = [];
  searchByName!: string;

  constructor(private clientService: ClientService,
              private router: Router) {}

  ngOnInit(): void {
    this.clientList = this.clientService.getAllClients();
  }

  searchClient() {
    if (this.searchByName == "" || undefined)
      this.clientList = this.clientService.getAllClients();

    let response = this.clientList.filter(res => res.nome?.indexOf(this.searchByName) !== -1);
    this.clientList = response;
  }

  sendToEdit(id?: string) {
    this.router.navigate(['/cadastro'], { queryParams: { "id": id } })
  }

  openModal(client: Client): void {
    debugger
    const dialogResp = this.dialog.open(ModalComponent, {
      width: '500px',
      data: {
        id: client.id,
        nome: client.nome
      }
    });

    dialogResp.afterClosed().subscribe(response => {
      if (response) {
        this.clientService.deleteClient(client);
        this.ngOnInit();
      }
    })
  }

}
