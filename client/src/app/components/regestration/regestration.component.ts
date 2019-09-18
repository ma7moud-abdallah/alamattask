import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regestration',
  templateUrl: './regestration.component.html',
  styleUrls: ['./regestration.component.scss']
})
export class RegestrationComponent implements OnInit {
  registerationForm;
  isLogin = true
  message: string = "";

  constructor(private api : ApiService, private formBuilder: FormBuilder, private router:Router) {
    this.registerationForm = this.formBuilder.group({
      name: '',
      phone: '',
      password:''
    });
   }

  ngOnInit() {
  
  }

  register(payload) {
    this.api.register(payload)
    .then(res => {
      this.message = "your account under review and will be activated in 24 hours"
    })
    .catch(err => this.message = err.msg || err.error.msg || 'registeration faild')
  }

  login(payload) {
    this.api.login(payload)
    .then((res: any) => {
      if(res.msg !== "success") return this.message = "your account under review and will be activated in 24 hours" 
      this.message = ""
      localStorage.setItem('user',JSON.stringify(res.user))
      this.router.navigate(['/flats'])
    })
    .catch(err => this.message = err.msg || err.error.msg || 'lofin faild')
  }

  toggle(){
    this.message = ""
    this.isLogin = !this.isLogin
  }
  


}
