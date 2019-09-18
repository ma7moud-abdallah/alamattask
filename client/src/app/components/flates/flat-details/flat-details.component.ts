import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SocketService } from 'src/app/services/socket.service';
import * as moment from 'moment'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-flat-details',
  templateUrl: './flat-details.component.html',
  styleUrls: ['./flat-details.component.scss']
})
export class FlatDetailsComponent implements OnInit, OnDestroy {
  flat: any = {};
  userId = JSON.parse(localStorage.getItem('user'))._id
  result: any = [];
  dayesToBeReseved = []
  ides = []
  payload
  message: string;
  _doc: Subscription;

  constructor(private socket: SocketService, private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.getflat(params.id)
    })
    this._doc = this.socket.getReservation().subscribe(res => {
        console.log(!this.flat._id == res.flat._id,res)
        if(!this.flat._id == res.flat._id) return
           this.flat = res.flat
           if(this.userId != res.userId) {
             this.message = "an reservation happened in on this trip pleas check ur selections again"
             this.showMessage()
           }
      })
  }

  ngOnDestroy() {
    this._doc.unsubscribe()
  }

  getflat(id){
    this.api.getOne(id)
    .then((res: any) => {
      this.flat = res.flat
      this.getDays()
    })
    .catch(err => {
      console.log('aaa', err)
    })
  }


  // get dayes
  getDays(){
      let start = moment(this.flat.available.startDate), // Sept. 1st
          end = moment(this.flat.available.endDate), // Nov. 2nd
          day = 0;                    // Sunday
      var current = start.clone();
      console.log({start,end,cc:current.clone().format('LLLL'),aa:current.day(7 + day).isBefore(end)})
      while (current.day(day).isBefore(end)) {
        this.result.push(current.clone());
        day++
        if(day === 8) day = 0
      }
  
      console.log(this.result.map(m => m.format('LLLL')));
    }

    displayedDate(date){
      return moment(date).format('ll')
    }

    addDay(e,day){
      console.log(e,day,e.target.checked)
      if(!day.available) return
      if(e.target.checked) return this.dayesToBeReseved.push(day)
      let index = this.dayesToBeReseved.findIndex(e => e._id == day._id)
      console.log({index})
      if(!(index > -1)) return
      this.dayesToBeReseved.splice(index , 1)
      console.log({ddd:this.dayesToBeReseved})
      
      // this.dayesToBeReseved.push(day._id)
    }

    addReservation(){
      if(!this.dayesToBeReseved.length) return
      let payload = {
        dayes: this.dayesToBeReseved,
        numberOfDayes: this.dayesToBeReseved.length,
        price: this.flat.pricePerDay * this.dayesToBeReseved.length,
        userId: this.userId,
        flatId: this.flat._id
      } 

      this.api.addReservation(payload)
      .then(res => {
        this.message = "reservation added successfully"
        this.showMessage()
        this.getflat(this.flat._id)
      })
      .catch(res => {
        this.message = "failed to add reservation"
        this.showMessage()
      })
       
    }

    showMessage(){
      // console.log(message)
      setTimeout(() => {this.message = ""},5000)
    }


}
