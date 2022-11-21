import { VeiculosService } from './../../veiculos.service';
import { Veiculos } from './../veiculos';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AuthService } from './../../auth.service';
import { MatPaginator } from '@angular/material/paginator'
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-veiculos-lista',
  templateUrl: './veiculos-lista.component.html',
  styleUrls: ['./veiculos-lista.component.css']
})
export class VeiculosListaComponent implements OnInit {

  displayedColumns: string[] = ['descricao', 'placa'];
  vei: Veiculos[] = [];
  usuarioLogadoTela = this.authService.getUsuarioAutenticado();
  veiculoSelecionado: Veiculos;
  mensagemSucesso: string;
  mensagemErro: string;

  dataSource = new MatTableDataSource<veic>();


  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


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

export interface veic {
  descricao: string;
  placa: number;
}
