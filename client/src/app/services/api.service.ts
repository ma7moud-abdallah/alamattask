import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // url = 'http://localhost:3000/api'
  url = '/api'
   
  constructor( private http : HttpClient) { }
  login (body) {
    // const params = new HttpParams().set('query',JSON.stringify(query));
    return this.http.post(`${this.url}/user/login`,body).toPromise()
  }
  register (body) {
    // const params = new HttpParams().set('query',JSON.stringify(query));
    return this.http.post(`${this.url}/user/register`,body).toPromise()
  }
  getflats () {
    return this.http.get(`${this.url}/flat`).toPromise()
  }
  getOne (id) {
    return this.http.get(`${this.url}/flat/${id}`).toPromise()
  }

  addReservation(payload){
    return this.http.post(`${this.url}/reservation/`,payload).toPromise()

  }
  
}


