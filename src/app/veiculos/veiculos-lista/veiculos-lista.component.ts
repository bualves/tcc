import { VeiculosService } from './../../veiculos.service';
import { Veiculos } from './../veiculos';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AuthService } from './../../auth.service';

@Component({
  selector: 'app-veiculos-lista',
  templateUrl: './veiculos-lista.component.html',
  styleUrls: ['./veiculos-lista.component.css']
})
export class VeiculosListaComponent implements OnInit {

  vei: Veiculos[] = [];
  usuarioLogadoTela = this.authService.getUsuarioAutenticado();
  veiculoSelecionado: Veiculos;
  mensagemSucesso: string;
  mensagemErro: string;


  constructor(
    private authService: AuthService,
    private service: VeiculosService
  ) { }

  ngOnInit(): void {
    this.service
    .getVeiculos()
    .subscribe(resposta => this.vei = resposta)
  }

  preparaDelecao(veiculos: Veiculos)
  {
    this.veiculoSelecionado = veiculos;
  }

  deletarVeiculo()
  {
    this.service
    .deletar(this.veiculoSelecionado)
    .subscribe(response => {this.mensagemSucesso = 'Veículo deletado com sucesso!'
    this.ngOnInit()},
    erro => this.mensagemErro = 'Ocorreu um erro ao deletar o motorista!')
  }

}


