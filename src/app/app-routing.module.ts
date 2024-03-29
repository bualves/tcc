import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from '../app/home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './auth.guard'

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: LayoutComponent, children: [
    {path: 'home', component: HomeComponent, canActivate : [AuthGuard]},
    {path: '' , redirectTo: '/home', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
