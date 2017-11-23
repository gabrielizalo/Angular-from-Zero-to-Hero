import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireAuthModule} from 'angularfire2/auth';

import { RouterModule, Routes} from '@angular/router';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { CitySearchComponent } from './city-search/city-search.component';
import { SearchComponent } from './search/search.component';
import { CheckinComponent } from './checkin/checkin.component';
import { PromoComponent } from './promo/promo.component';
import { FlightComponent } from './flight/flight.component';

export const firebaseConfig = {
  apiKey: "AIzaSyBE4zxQ6uHlINXqwU03Xk51aQgFPVKS_SY",
  authDomain: "angularairline.firebaseapp.com",
  databaseURL: "https://angularairline.firebaseio.com",
  projectId: "angularairline",
  storageBucket: "",
  messagingSenderId: "241089522066"
};

const appRoutes : Routes = [
  {path:'search', component: SearchComponent},
  {path:'flights/:from/:to/:passengers', component: FlightComponent},
  {path:'promociones', component: PromoComponent},
  {path:'', redirectTo:'/search', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    CitySearchComponent,
    SearchComponent,
    CheckinComponent,
    PromoComponent,
    FlightComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
