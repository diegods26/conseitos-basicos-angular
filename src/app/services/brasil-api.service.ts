import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado, Municipio } from '../models/brasil-api.models';

@Injectable({
  providedIn: 'root'
})
export class BrasilApiService {

  baseUrl: string = 'https://brasilapi.com.br/api';

  constructor(private http: HttpClient) { }

  listarUFs() : Observable<Estado[]> {
    return this.http.get<Estado[]>(this.baseUrl + '/ibge/uf/v1');
  }

  listarMunicipios(uf: string) : Observable<Municipio[]> {
    const path = '/ibge/municipios/v1/' + uf;
    return this.http.get<Municipio[]>(this.baseUrl + path);
  }
}
