import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Client } from './client';
import { ClientService } from '../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrasilApiService } from '../services/brasil-api.service';
import { Estado, Municipio } from '../models/brasil-api.models';

@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, FormsModule, NgxMaskDirective, MatSnackBarModule],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);

  client: Client = Client.newClient();
  isLoading = true;
  isEditing: boolean = false;
  buttonText!: string;
  estados: Estado[] = [];
  municipios!: Municipio[];

  constructor(
    private clientService: ClientService,
    private brasilApiService: BrasilApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.finishInitialLoading();
  }

  ngOnInit(): void {
    this.getAllUFs();

    this.route.queryParamMap.subscribe((query: any) => {
      const params = query['params'];
      const id = params['id'];

      if (id) {
        this.isEditing = true;
        this.buttonText = 'Atualizar';
        this.client = this.clientService.getClientById(id)!;
      } else {
        this.buttonText = 'Cadastrar';
      }
    });
  }

  private finishInitialLoading() {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  onSubmit(formulario: NgForm) {
    if (formulario.invalid) {
      return;
    }

    this.isLoading = true;

    try {
      if (!this.isEditing) {
        this.clientService.save(this.client);
        formulario.resetForm();
        this.openSnackBar('Cadastro realizado com sucesso!');
      } else {
        this.clientService.updateClient(this.client);
        formulario.resetForm();
        this.openSnackBar('Cliente atualizado com sucesso!');
        this.router.navigate(['/consulta']);
      }
    } finally {
      this.isLoading = false;
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK');
  }

  getAllUFs() {
    this.brasilApiService.listarUFs().subscribe({
      next: (resp) => {
        this.estados = resp;
      },
      error: (erro) => console.log('Aconteceu um erro: ', erro),
    });
  }

  getAllMucipios(event: Event) {
    const ufSelected: string =  event as any;

    this.brasilApiService.listarMunicipios(ufSelected).subscribe({
      next: (resp) => { this.municipios = resp; console.log(resp) },
      error: (erro) => console.log('Aconteceu um erro: ', erro),
    });
  }
}
