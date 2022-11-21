import { MotoristasService } from './../../motoristas.service';
import { Component, OnInit } from '@angular/core';
import { Motoristas } from '../motoristas';
import { Router, Params, ActivatedRoute } from '@angular/router'
import { AuthService } from './../../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-motoristas-cadastro',
  templateUrl: './motoristas-cadastro.component.html',
  styleUrls: ['./motoristas-cadastro.component.css']
})
export class MotoristasCadastroComponent implements OnInit {

  servico: Motoristas;
  id: number;
  success: boolean = false;
  errors: String[];
  usuarioLogadoTela: string;

  constructor(
    private service: MotoristasService,
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute)
    {
    this.servico = new Motoristas();
   }

  ngOnInit(): void {
    this.usuarioLogadoTela = this.authService.getUsuarioAutenticado();
    let params : Observable<Params> = this.activatedRoute.params

    params.subscribe(urlParams =>
      {
        this.id = urlParams['id'];
        if(this.id)
        {
          this.service
          .getMotoristaById(this.id)
          .subscribe(
          response => this.servico = response ,
          errorResponse => this.servico = new Motoristas()
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
          this.errors = ['Erro ao atualizar o Motorista!']
        })
    }
    else
    {
      this.service
      .salvar(this.servico)
      .subscribe( response => {
      this.success = true;
      this.errors = [];
      this.servico = new Motoristas();
    } , errorResponse => {
      this.success = false;
      this.errors = errorResponse.error.errors;
    })
    }
  }

  voltarParaListagem()
  {
    this.router.navigate(['/motoristas/lista'])
  }
}
