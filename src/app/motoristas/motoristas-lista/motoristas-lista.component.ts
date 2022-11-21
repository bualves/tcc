import { MotoristasService } from './../../motoristas.service';
import { Motoristas } from './../motoristas';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth.service';


@Component({
  selector: 'app-motoristas-lista',
  templateUrl: './motoristas-lista.component.html',
  styleUrls: ['./motoristas-lista.component.css']
})
export class MotoristasListaComponent implements OnInit {

  moto: Motoristas[] = [];
  usuarioLogadoTela = this.authService.getUsuarioAutenticado();
  motoristaSelecionado: Motoristas;
  mensagemSucesso: string;
  mensagemErro: string;

  constructor(
    private service: MotoristasService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.service
    .getMotoristas()
    .subscribe(resposta => this.moto = resposta)
  }

  preparaDelecao(motoristas: Motoristas)
  {
    this.motoristaSelecionado = motoristas;
  }

  deletarMotorista()
  {
    this.service
    .deletar(this.motoristaSelecionado)
    .subscribe(response => {this.mensagemSucesso = 'Motorista deletado com sucesso!'
    this.ngOnInit()},
    erro => this.mensagemErro = 'Ocorreu um erro ao deletar o motorista!')
  }

}
