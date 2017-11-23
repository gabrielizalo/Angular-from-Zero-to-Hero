import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PromosService } from '../promos.service';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css'],
  encapsulation: ViewEncapsulation.Native,
  providers: [PromosService]
  
})
export class PromoComponent implements OnInit {

  promos;

  constructor(private promoSvc : PromosService ) { }
  
  ngOnInit() {
    this.promoSvc.getPromos()
                  .subscribe( promos => {
                    this.promos = promos;
                    console.log(this.promos);
                  
                  });
  }

}
