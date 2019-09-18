import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs';
// import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = "/";
  // private url = environment.baseUrl;
  private socket;

  constructor() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      console.log({user})
      this.socket = io(this.url,  {});
    }
  }

  public getReservation = () => {
    return Observable.create((observer) => {
      this.socket.on('reservation-added', (reservation) => {
        observer.next(reservation);
      });
    });
  }
}