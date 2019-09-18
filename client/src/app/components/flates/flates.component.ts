import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-flates',
  templateUrl: './flates.component.html',
  styleUrls: ['./flates.component.scss']
})
export class FlatesComponent implements OnInit {
  flats: Object;

  constructor(private router:Router,private api:ApiService) {
    if(!localStorage.getItem('user')) this.router.navigate['regiser']   
  }

  ngOnInit() {
    this.api.getflats()
    .then((flats:any) => { 
      this.flats = flats.flat
    })
    .catch(err => console.log(err))
  }

  showDetails(flat){
    this.router.navigate([`flats/${flat._id}`])
  }

}
