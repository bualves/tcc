import { FreteService } from './../../frete.service';
import { Component, OnInit } from '@angular/core';
import { Frete } from '../frete';
import { AuthService } from './../../auth.service';
import { subscriptionLogsToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Component({
  selector: 'app-frete-lista',
  templateUrl: './frete-lista.component.html',
  styleUrls: ['./frete-lista.component.css']
})
export class FreteListaComponent implements OnInit {

  fre: Frete[] = [];
  usuarioLogadoTela = this.authService.getUsuarioAutenticado();
  freteSelecionado: Frete;
  mensagemSucesso: string;
  mensagemErro: string;
  valorpago: number;
  valortotal: number;

  constructor(
    private service: FreteService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.service
    .getFrete()
    .subscribe(resposta => this.fre = resposta)
  }

  preparaDelecao(frete: Frete)
  {
    this.freteSelecionado = frete;
  }

  deletarFrete()
  {
    this.service
    .deletar(this.freteSelecionado)
    .subscribe(response => {this.mensagemSucesso = 'Frete deletado com sucesso!'
    this.ngOnInit()},
    erro => this.mensagemErro = 'Ocorreu um erro ao deletar o frete!')
  }

  calcular(valortotal: number, valorpago: number)
  {
    return valortotal - valorpago;
  }
}
