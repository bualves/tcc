import { VeiculosService } from './../../veiculos.service';
import { Veiculos } from './../veiculos';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-veiculos-cadastro',
  templateUrl: './veiculos-cadastro.component.html',
  styleUrls: ['./veiculos-cadastro.component.css']
})
export class VeiculosCadastroComponent implements OnInit {

  veiculos: Veiculos;
  usuarioLogadoTela: string;
  id: number;
  errors: String[];
  success: boolean = false;

  constructor(
    private service: VeiculosService,
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute)
    {
      this.veiculos = new Veiculos();
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
          .getVeiculosById(this.id)
          .subscribe(
          response => this.veiculos = response ,
          errorResponse => this.veiculos = new Veiculos()
        )}
      })
  }

  onSubmit()
  {
    this.veiculos.usuarioLogado = this.usuarioLogadoTela;
    if(this.id)
    {
      this.service.atualizar(this.veiculos)
      .subscribe( response =>
        {
          this.success = true;
          this.errors = [];
        }, errorResponse =>
        {
          this.errors = ['Erro ao atualizar o Veículo!']
        })
    }
    else
    {
      this.service
      .salvar(this.veiculos)
      .subscribe( response => {
      this.success = true;
      this.errors = [];
      this.veiculos = new Veiculos();
    } , errorResponse => {
      this.success = false;
      this.errors = errorResponse.error.errors;
    })
    }
  }

  voltarParaListagem()
  {
    this.router.navigate(['/veiculos/lista'])
  }

}
