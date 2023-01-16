import { MotoristasListaComponent } from './motoristas-lista/motoristas-lista.component';
import { MotoristasCadastroComponent } from './motoristas-cadastro/motoristas-cadastro.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './../layout/layout.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {path: 'motoristas', component: LayoutComponent, canActivate:[AuthGuard], children: [
    {path: 'cadastro', component: MotoristasCadastroComponent},
    {path: 'lista', component: MotoristasListaComponent},
    {path: 'cadastro/:id', component: MotoristasCadastroComponent},
    {path: '' , redirectTo: '/motoristas/lista', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MotoristasRoutingModule { }
