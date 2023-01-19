import { VeiculosService } from './../../veiculos.service';
import { Veiculos } from './../../veiculos/veiculos';
import { MotoristasService } from './../../motoristas.service';
import { Motoristas } from './../../motoristas/motoristas';
import { Component, OnInit } from '@angular/core';
import { Frete } from '../frete';
import { Router, Params, ActivatedRoute } from '@angular/router'
import { AuthService } from './../../auth.service';
import { Observable } from 'rxjs';
import { FreteService } from 'src/app/frete.service';

@Component({
  selector: 'app-frete-cadastro',
  templateUrl: './frete-cadastro.component.html',
  styleUrls: ['./frete-cadastro.component.css']
})
export class FreteCadastroComponent implements OnInit {

  servico: Frete;
  motorista: Motoristas [] = []
  veiculo: Veiculos [] = []
  id: number;
  success: boolean = false;
  errors: String[];
  statusFrete: string;
  statusFretes: string[];
  statusPagamento: string;
  statusPagamentos: string[];
  usuarioLogadoTela: string;

  constructor(
    private service: FreteService,
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private motoristaService : MotoristasService,
    private veiculoService: VeiculosService)
    {
    this.servico = new Frete();
    this.statusFretes = ['EM ANDAMENTO', 'ENCERRADO'];
    this.statusPagamentos = ['FALTA PAGAMENTO', 'PAGO', 'NÃO PAGO'];
   }

   ngOnInit(): void {
    this.usuarioLogadoTela = this.authService.getUsuarioAutenticado();
    let params : Observable<Params> = this.activatedRoute.params

    this.motoristaService
      .getMotoristas()
      .subscribe( response => this.motorista = response )

    this.veiculoService
      .getVeiculos()
      .subscribe( response => this.veiculo = response )

    params.subscribe(urlParams =>
      {
        this.id = urlParams['id'];
        if(this.id)
        {
          this.service
          .getFreteById(this.id)
          .subscribe(
          response => this.servico = response ,
          errorResponse => this.servico = new Frete()
        )}
      })
  }

  onSubmit()
  {
    this.servico.usuarioLogado = this.usuarioLogadoTela;
    if(this.id)
    {
      this.service.atualizar(this.servico)
      .subscribe( response =>
        {
          this.success = true;
          this.errors = [];
        }, errorResponse =>
        {
          this.errors = ['Erro ao atualizar o Frete!']
        })
    }
    else
    {
      this.service
      .salvar(this.servico)
      .subscribe( response => {
      this.success = true;
      this.errors = [];
      this.servico = new Frete();
    } , errorResponse => {
      this.success = false;
      this.errors = errorResponse.error.errors;
    })
    }
  }

  voltarParaListagem()
  {
    this.router.navigate(['/frete/lista'])
  }
}
