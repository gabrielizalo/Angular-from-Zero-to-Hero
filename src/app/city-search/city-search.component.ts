import { Component, OnInit, ViewEncapsulation,ElementRef, 
  ViewChild, Output,EventEmitter } from '@angular/core';
import { CitiesService } from '../cities.service';
import { Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css'],
  inputs: ['label'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [CitiesService]
})
export class CitySearchComponent implements OnInit {
  @ViewChild('search_box') search_box : ElementRef;
  @Output() onSelect = new EventEmitter<any>();
  cities; 
  startAt = new Subject();
  endAt   = new Subject();
  lastKeypress: number = 0;
  selection;

  constructor(private citiesSvc : CitiesService) { }

  ngOnInit() {
    this.citiesSvc.getCities(this.startAt, this.endAt)
                   .subscribe( cities => {
                      this.cities = cities
                    })
  }

  setCity(city){
    this.onSelect.emit(city);
    this.search_box.nativeElement.value = city.name;
    this.selection = city;
    this.cities = null;
  }

  search($event){
    if ($event.timeStamp - this.lastKeypress > 200) {
      let q = $event.target.value.toUpperCase();
      this.startAt.next(q);
      this.endAt.next(q+"\uf8ff");
    }
    this.lastKeypress = $event.timeStamp;
  }
}
