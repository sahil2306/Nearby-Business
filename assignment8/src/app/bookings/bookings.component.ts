import { Component, OnInit, Input } from '@angular/core';
import { SharedReservationsService } from '../shared-reservations.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  message:any;
  data:any[] = [];
  constructor(private sharedreservations:SharedReservationsService) {  }

  ngOnInit() {
    // this.sharedreservations.sharedMessage.subscribe(message => this.data = message);
    if(localStorage.getItem('reservations')!=undefined){
      const a = localStorage.getItem('reservations');
      this.data = JSON.parse(a || '[]');
      // console.log("Reservations --- ",a);
    }
  }

  deleteBooking(id: string) {
    alert("Resrvation cancelled!");
    // this.data = this.data.filter((res:any) => res.id !== id);
    // this.sharedreservations.updateData(this.data);
    if(localStorage.getItem('reservations')!=undefined){
      const a = localStorage.getItem('reservations');
      let temp = JSON.parse(a || '[]');
      temp = temp.filter((item:any) => item.id !== id);
      this.data = temp;
      localStorage.setItem('reservations', JSON.stringify(temp));
      // console.log("Reservations --- ",a);
    }
  }

  isPopulated() {
    if(this.data.length > 0) {
      return true;
    }
    return false;
  }

  isNotPopulated() {
    if(this.data.length == 0) {
      return true;
    }
    return false;
  }
}
