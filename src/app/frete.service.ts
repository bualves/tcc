import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from "../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Frete } from './frete/frete';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FreteService {

  usuarioLogado = this.authService.getUsuarioAutenticado();
  apiURL: string = environment.apiURLBase + '/api/frete';

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  salvar(Frete: Frete) : Observable<Frete>
  {
    return this.http.post<Frete>(this.apiURL, Frete)
  }

  getFrete() : Observable<Frete[]>
  {
    return this.http.get<Frete[]>(this.apiURL);
  }

  atualizar(frete : Frete) : Observable<any>
  {
    return this.http.put<Frete>(`${this.apiURL}/${frete.id}`, frete);
  }

  getFreteById(id: number): Observable<Frete>
  {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  deletar(frete: Frete): Observable<any>
  {
    return this.http.delete<any>(`${this.apiURL}/${frete.id}`);
  }
}
