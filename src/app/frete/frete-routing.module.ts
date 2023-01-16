import { FreteListaComponent } from './frete-lista/frete-lista.component';
import { FreteCadastroComponent } from './frete-cadastro/frete-cadastro.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './../layout/layout.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {path: 'frete', component: LayoutComponent, canActivate:[AuthGuard], children: [
  {path: 'cadastro', component: FreteCadastroComponent},
  {path: 'lista', component: FreteListaComponent},
  {path: 'cadastro/:id', component: FreteCadastroComponent},
  {path: '' , redirectTo: '/motoristas/lista', pathMatch: 'full'}
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreteRoutingModule { }
