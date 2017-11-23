import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

@Injectable()
export class PromosService {

  constructor(private db: AngularFireDatabase) { 
    
  }

  getPromos(): FirebaseListObservable<any>{
    return this.db.list('/promos',{
      query : {
        orderByChild: "name",
        limitToFirst: 40,
      }
    });
  }
}
