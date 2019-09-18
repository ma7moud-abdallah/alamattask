import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'plistings';
  constructor(private router:Router,private route:ActivatedRoute){
  }
  ngOnInit() {
      if(!localStorage.getItem('user')) return this.router.navigate(['register'])
      this.router.navigate(['flats'])
  }
}
