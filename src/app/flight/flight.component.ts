import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FlightsService} from '../flights.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css'],
  encapsulation: ViewEncapsulation.Native,
  providers : [FlightsService]
})
export class FlightComponent implements OnInit {
  flights ;
  passengers; 
  selection;
  reservation;
  constructor(private router:Router,
    private route: ActivatedRoute,
    private flightsSvc : FlightsService
  ) { }

  select(flight, id, price){
    let subtotal = this.passengers*price;
    let discount = flight.discount  ? ( subtotal * flight.discount/100) : 0;
    let real_price = subtotal - discount;
    let taxes = real_price*0.30;
    let total = taxes + real_price;

    this.selection = { 
      code : flight.code,
      id,
      price,
      discount,
      subtotal,
      real_price,
      taxes,
      total,
      currency : flight.currency
    }; 
  }

  reserve(){
    let reservation = Object.assign({}, this.selection);
    reservation.code = this.createRandomString(10);
    this.flightsSvc.reserve(reservation).then( item => {
      if(item.key){
          this.reservation = reservation;
      }
    })
  }

  createRandomString( length ) {  
    let str = "";
    for ( ; str.length < length; str += Math.random().toString( 36 ).substr( 2 ) );
    return str.substr( 0, length );
  }

  ngOnInit() {
    this.route.params.subscribe( p => { 
      this.flightsSvc.getFlights(p['from'], p['to'])
      .subscribe( flights => {
        this.passengers = p['passengers'];
        this.flights = flights[0];
      })

    })
  }

}
