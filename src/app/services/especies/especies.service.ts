import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Especie } from 'src/app/interfaces/especie';

@Injectable({
  providedIn: 'root'
})
export class EspeciesService {
  apiBaseUrl:string ='https://apimpf.herokuapp.com';

  constructor(private http:HttpClient) { }
  public findAll(): Observable<Especie[]>{
    return this.http.get<Especie[]>(this.apiBaseUrl+'/especie');
  }
}
