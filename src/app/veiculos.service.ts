import { Veiculos } from './veiculos/veiculos';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeiculosService {

  usuarioLogado = this.authService.getUsuarioAutenticado();
  apiURL: string = environment.apiURLBase + '/api/veiculos';

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  getVeiculosById(id: number) : Observable<Veiculos>
  {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  salvar(veiculos: Veiculos) : Observable<Veiculos>
  {
    return this.http.post<Veiculos>(this.apiURL, veiculos)
  }

  atualizar(veiculos: Veiculos): Observable<any>
  {
    return this.http.put<Veiculos>(`${this.apiURL}/${veiculos.id}`, veiculos);
  }

  deletar(veiculos: Veiculos): Observable<any>
  {
    return this.http.delete<any>(`${this.apiURL}/${veiculos.id}`);
  }

  getVeiculos() : Observable<Veiculos[]>
  {
    return this.http.get<Veiculos[]>(this.apiURL);
  }
}
