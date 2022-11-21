import { VeiculosListaComponent } from './veiculos-lista/veiculos-lista.component';
import { VeiculosCadastroComponent } from './veiculos-cadastro/veiculos-cadastro.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { LayoutComponent } from '../layout/layout.component';

const routes: Routes = [
  {path: 'veiculos', component: LayoutComponent, canActivate:[AuthGuard], children: [
    {path: 'cadastro', component: VeiculosCadastroComponent},
    {path: 'lista', component: VeiculosListaComponent},
    {path: 'cadastro:id', component: VeiculosCadastroComponent},
    {path: '' , redirectTo: '/veiculos/lista', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VeiculosRoutingModule { }
