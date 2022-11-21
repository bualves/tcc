import { LayoutComponent } from './../layout/layout.component';
import { ServicoPrestadoListaComponent } from './servico-prestado-lista/servico-prestado-lista.component';
import { ServicoPrestadoFormComponent } from './servico-prestado-form/servico-prestado-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';


const routes: Routes = [
  {path: 'servicos-prestado', component: LayoutComponent, canActivate:[AuthGuard], children: [
    {path: 'form', component: ServicoPrestadoFormComponent},
    {path: 'lista' , component: ServicoPrestadoListaComponent},
    {path:'', redirectTo: '/servicos-prestado/lista', pathMatch:'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicoPrestadoRoutingModule { }
