import { VeiculosService } from './veiculos.service';
import { VeiculosModule } from './veiculos/veiculos.module';
import { MotoristasService } from './motoristas.service';
import { MotoristasModule } from './motoristas/motoristas.module';
import { TokenInterceptor } from './token.interceptor';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component'
import { ClientesModule } from './clientes/clientes.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TemplateModule } from './template/template.module';
import { HomeComponent } from './home/home.component'
import { ClientesService } from './clientes.service'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ServicoPrestadoModule } from './servico-prestado/servico-prestado.module'
import { ServicoPrestadoService } from "./servico-prestado.service";
import { LayoutComponent } from './layout/layout.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LayoutComponent
  ],
  imports: [
    ServicoPrestadoModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TemplateModule,
    ClientesModule,
    FormsModule,
    MotoristasModule,
    VeiculosModule,
    ReactiveFormsModule
  ],
  providers: [
    ClientesService,
    ServicoPrestadoService,
    MotoristasService,
    VeiculosService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
