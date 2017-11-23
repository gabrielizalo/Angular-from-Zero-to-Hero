import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { CitiesService } from '../cities.service';
import { Subject } from 'rxjs/Subject';

@Component ( {
  selector     : 'app-city-search',
  templateUrl  : './city-search.component.html',
  styleUrls    : [ './city-search.component.css' ],
  providers    : [ CitiesService ],
  encapsulation: ViewEncapsulation.Emulated//,
  //inputs       : [ 'label' ]
} )

export class CitySearchComponent implements OnInit {

  @Input() label: string;
  @ViewChild ( 'search_box' ) search_box: ElementRef;
                              cities;
                              startAt      = new Subject ();
                              endAt        = new Subject ();
                              lastKeyPress = 0;
  @Output() onSelect = new EventEmitter();

  constructor ( private citiesSvc: CitiesService ) {
  }

  ngOnInit () {
    this.citiesSvc.getCities ( this.startAt, this.endAt )
      .subscribe ( cities => {
        this.cities = cities;
      } );
  }

  setCity ( city ) {
    // console.log ( city );
    this.onSelect.emit(city);
    this.search_box.nativeElement.value = city.name;
    this.cities                         = null;
  }

  search ( $event ) {
    if ( $event.timeStamp - this.lastKeyPress > 1000 ) {
      // console.log ( 'executing search.. greetings to tati' );
      let q = $event.target.value.toUpperCase ();
      this.startAt.next ( q );
      this.endAt.next ( q + '\uf8ff' );
      // console.log ( q );
    }
    this.lastKeyPress = $event.timeStamp;
  }


}
