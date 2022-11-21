import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotoristasRoutingModule } from './motoristas-routing.module';
import { MotoristasCadastroComponent } from './motoristas-cadastro/motoristas-cadastro.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MotoristasListaComponent } from './motoristas-lista/motoristas-lista.component';


@NgModule({
  declarations: [
    MotoristasCadastroComponent,
    MotoristasListaComponent
  ],
  imports: [
    CommonModule,
    MotoristasRoutingModule,
    FormsModule,
    RouterModule
  ], exports : [
    MotoristasCadastroComponent,
    MotoristasListaComponent
  ]
})
export class MotoristasModule { }
