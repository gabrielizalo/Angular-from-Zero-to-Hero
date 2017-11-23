import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FlightsService} from '../flights.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css'],
  encapsulation: ViewEncapsulation.Native
})
export class CheckinComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  
  }

}
