import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

@Injectable ()
export class CitiesService {

  constructor ( private db: AngularFireDatabase ) {
  }

  getCities ( start, end ): FirebaseListObservable<any> {
    return this.db.list('/cities', {
      query: {
        orderByChild: 'name',
        limitToFirst: 10,
        startAt: start,
        endAt: end
      }
    });
  }
}
