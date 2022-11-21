import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Motoristas } from './motoristas/motoristas';
import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MotoristasService {

  usuarioLogado = this.authService.getUsuarioAutenticado();
  apiURL: string = environment.apiURLBase + '/api/motoristas';


  constructor(private http: HttpClient,
    private authService: AuthService) { }

  salvar(Motoristas: Motoristas) : Observable<Motoristas>
  {
    return this.http.post<Motoristas>(this.apiURL, Motoristas)
  }

  /*getMotoristas(usuarioLogado: string) : Observable<Motoristas[]>
  {
    const httpParams = new HttpParams()
    .set("" , usuarioLogado.toString());

    const url = this.apiURL + httpParams.toString();
    return this.http.get<Motoristas[]>(`${this.apiURL}/${usuarioLogado}`);
  }*/

  getMotoristas() : Observable<Motoristas[]>
  {
    return this.http.get<Motoristas[]>(this.apiURL);
  }

  atualizar(motoristas : Motoristas) : Observable<any>
  {
    return this.http.put<Motoristas>(`${this.apiURL}/${motoristas.id}`, motoristas);
  }

  getMotoristaById(id: number): Observable<Motoristas>
  {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  deletar(motoristas: Motoristas): Observable<any>
  {
    return this.http.delete<any>(`${this.apiURL}/${motoristas.id}`);
  }
}
