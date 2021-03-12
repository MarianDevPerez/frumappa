import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recolector } from 'src/app/interfaces/recolector';

@Injectable({
  providedIn: 'root'
})
export class RecolectoresService {
  apiBaseUrl:string ='https://apimpf.herokuapp.com';

constructor(private http: HttpClient) { }
//find 1 recolector
public findRecolector(id:number){
  const url =this.apiBaseUrl+'/recolector/'+id;
  return this.http.get<Recolector>(url);
}
public findAll(): Observable<Recolector[]>{
  return this.http.get<Recolector[]>(this.apiBaseUrl+'/recolector');
}

public createRecolector(recolector: Recolector): Observable<any>{
  return this.http.post(this.apiBaseUrl+'/recolector', recolector);
}

public editRecolector(recolector: Recolector): Observable<any>{
  return this.http.put(this.apiBaseUrl+'/recolector', recolector);
}
}
