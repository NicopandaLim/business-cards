import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private db: AngularFireDatabase) {
   }

   getBehavHistory() {
     return this.db.list('history').valueChanges();
   }
}
