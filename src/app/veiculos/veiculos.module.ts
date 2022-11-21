import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VeiculosRoutingModule } from './veiculos-routing.module';
import { VeiculosCadastroComponent } from './veiculos-cadastro/veiculos-cadastro.component';
import { VeiculosListaComponent } from './veiculos-lista/veiculos-lista.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    VeiculosCadastroComponent,
    VeiculosListaComponent
  ],
  imports: [
    CommonModule,
    VeiculosRoutingModule,
    FormsModule,
    RouterModule
  ], exports : [
    VeiculosCadastroComponent,
    VeiculosListaComponent
  ]
})
export class VeiculosModule { }
