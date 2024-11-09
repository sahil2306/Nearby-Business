import { Component, OnInit } from '@angular/core';
import { SearchBusinessService } from '../search-business.service';

@Component({
  selector: 'app-show-businesses',
  templateUrl: './show-businesses.component.html',
  styleUrls: ['./show-businesses.component.css']
})
export class ShowBusinessesComponent implements OnInit {

  constructor(private service:SearchBusinessService) { }

  ngOnInit(): void {
  }

}
