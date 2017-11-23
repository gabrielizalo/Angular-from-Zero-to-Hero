import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup,  Validators  } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SearchComponent implements OnInit {

  searchForm : FormGroup;
  router : Router;
  constructor( private fb: FormBuilder, private routerCore: Router) {
    this.createForm();
    this.router = routerCore;
   }

   createForm(){
    this.searchForm = this.fb.group({
      passengers : [1,Validators.required],
      from : ['', Validators.required],
      to : ['', Validators.required]
    })
   }

  onSubmit(){
    let from = this.searchForm.value['from'];
    let to = this.searchForm.value['to'];
    let passengers = this.searchForm.value['passengers'];
    this.router.navigate([`/flights/${from}/${to}/${passengers}`]);
  }

  ngOnInit(){

  }

  change(step){
    let temp = parseInt(this.searchForm.value['passengers'])+step;
    if(temp > 0){
      this.searchForm.patchValue({passengers: temp});
    }
  }

  onSelect(type,data){
    let assign = { };
    assign[type] = data.code;
    this.searchForm.patchValue(assign);
  }

}
