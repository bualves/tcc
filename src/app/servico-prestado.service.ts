import { ServicoPrestadoBusca } from './servico-prestado/servico-prestado-lista/servicoPrestadoBusca';
import { Observable } from 'rxjs';
import { ServicoPrestado } from './servico-prestado/servicoPrestado';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  apiURL: string = environment.apiURLBase+ "/api/servicos-prestado";

  constructor(private http: HttpClient) { }

  salvar(ServicoPrestado: ServicoPrestado) : Observable<ServicoPrestado>
  {
    return this.http.post<ServicoPrestado>(this.apiURL, ServicoPrestado )
  }

  buscar(nome: string, mes:string) : Observable<ServicoPrestadoBusca[]>
  {
    const httpParams = new HttpParams()
      .set("nome" , nome)
      .set("mes" , mes ? mes.toString() : '');

    const url = this.apiURL + "?" + httpParams.toString();
    return this.http.get<any>(url);
  }
}
