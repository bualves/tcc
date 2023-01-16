import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreteRoutingModule } from './frete-routing.module';
import { FreteCadastroComponent } from './frete-cadastro/frete-cadastro.component';
import { FreteListaComponent } from './frete-lista/frete-lista.component';


@NgModule({
  declarations: [
    FreteCadastroComponent,
    FreteListaComponent
  ],
  imports: [
    CommonModule,
    FreteRoutingModule,
    FormsModule,
    RouterModule
  ], exports : [
    FreteCadastroComponent,
    FreteListaComponent
  ]
})
export class FreteModule { }
