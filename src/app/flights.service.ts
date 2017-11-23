import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

@Injectable()
export class FlightsService {

  constructor(private db: AngularFireDatabase) { }
  
  reserve(obj){
    return this.db.list('/reservations').push(obj);
  }

  findReservation(code){
    return this.db.list('/reservations',{
      query : {
        orderByChild: "code",
        limitToFirst: 40,
        startAt: code,
      }
    });
  }

  getFlights(from, to): FirebaseListObservable<any>{
    return this.db.list('/flights',{
      query : {
        orderByChild: "code",
        limitToFirst: 40,
        startAt: from+to,
      }
    });
  }
}
