import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;
  cadastrando: boolean;
  mensagemSucesso: boolean;
  errors: String[];


  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  onSubmit()
  {
    this.authService
      .tentarLogar(this.username, this.password)
      .subscribe( response => {
        const access_token = JSON.stringify(response)
        localStorage.setItem('access_token' , access_token)
        this.router.navigate(['/home'])
      }, errorResponse =>
      {
        this.errors = ['Usuário e/ou senha incorretos.']
      })

  }

  preparaCadastrar(event: any)
  {
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro()
  {
    this.cadastrando = false;
    this.mensagemSucesso = false;
  }

  cadastrar()
  {
    const usuario: Usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;
    this.authService
      .salvar(usuario)
      .subscribe( response => {
        this.mensagemSucesso = true;
        this.cadastrando=false;
        this.username='';
        this.password='';
        this.errors=[];
      }, errorResponse => {
        this.errors = errorResponse.error.errors;
        this.mensagemSucesso = false;
      })
  }
}
