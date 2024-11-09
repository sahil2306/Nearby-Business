import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessSearchComponent } from '../business-search/business-search.component';
import { SharedReservationsService } from '../shared-reservations.service';
import { BookingsComponent } from '../bookings/bookings.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  message:any;

  constructor(private sharedreservations:SharedReservationsService) { }

  ngOnInit() {
    const path = window.location.pathname;
    if (path === '/search' || path === '/') {
      (<HTMLButtonElement> document.getElementById('search')).style.border = "2px solid black";
      (<HTMLButtonElement> document.getElementById('search')).style.borderRadius = "14px";
      (<HTMLButtonElement> document.getElementById('bookings')).style.border = "0px";
    }
    else{
      (<HTMLButtonElement> document.getElementById('search')).style.border = "0px";
      (<HTMLButtonElement> document.getElementById('bookings')).style.border = "2px solid black";
      (<HTMLButtonElement> document.getElementById('bookings')).style.borderRadius = "14px";
    }
    // this.sharedreservations.sharedMessage.subscribe(message => this.message = message);
    // console.log(this.message);
  }

  public searchClicked(){
    (<HTMLButtonElement> document.getElementById('search')).style.border = "2px solid black";
      (<HTMLButtonElement> document.getElementById('bookings')).style.border = "0px";
      (<HTMLButtonElement> document.getElementById('search')).style.borderRadius = "14px";

  }
  public bookingsClicked(){
    (<HTMLButtonElement> document.getElementById('search')).style.border = "0px";
      (<HTMLButtonElement> document.getElementById('bookings')).style.border = "2px solid black";
      (<HTMLButtonElement> document.getElementById('bookings')).style.borderRadius = "14px";

  }

}
