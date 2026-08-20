import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculadora',
  imports: [CommonModule, FormsModule],
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.scss',
})
export class CalculadoraComponent {
  numero1: number = 0;
  numero2: number = 0;
  resultado: number = 0;
  operadorSelecionado: '+' | '-' | '/' | '*' | null = null;

  selecionarOperador(operador: '+' | '-' | '/' | '*') {
    this.operadorSelecionado = operador;
  }

  somar() {
    let calculo = `${this.numero1} ${this.operadorSelecionado} ${this.numero2}`;
    this.resultado = eval(calculo);
  }
}
