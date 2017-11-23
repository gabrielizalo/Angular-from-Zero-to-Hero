import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component ( {
  selector   : 'app-search',
  templateUrl: './search.component.html',
  styleUrls  : [ './search.component.css' ]
} )
export class SearchComponent implements OnInit {

  searchForm: FormGroup;

  constructor ( private fb: FormBuilder, private routerCore : Router) {
    this.createForm ();
    this.router = this.routerCore;
  }

  onSubmit () {
    let from = this.searchForm.value['from'];
    let to = this.searchForm.value['to'];
    let passengers = this.searchForm.value['passengers'];
  }

  selection ( type, $event ) {
    // console.log ( 'here' );
    // console.log ( $event );
    let assign     = {};
    assign[ type ] = $event.code;
    this.searchForm.patchValue ( assign );
  }

  createForm () {
    this.searchForm = this.fb.group ( {
      passengers: [ 1, Validators.required ],
      from      : [ '', Validators.required ],
      to        : [ '', Validators.required ]
    } );
  }

  changePassengers ( step ) {
    let temp = parseInt ( this.searchForm.value[ 'passengers' ] + step );
    if ( temp > 0 ) {
      this.searchForm.patchValue ( { passengers: temp } );
    }
  }

  ngOnInit () {
  }

}
