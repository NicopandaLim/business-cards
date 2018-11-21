import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BusinessCard } from '../models/business-card';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable()
export class DashboardService {
  cards: any[];
  constructor(private db: AngularFireDatabase) { }

  addBusinessCard(bc: BusinessCard) {
    const businessCardRef = this.db.list('businessCards');
    businessCardRef.push(bc);
  }

  getBusinessCards()  {
    //this.cards = [];   // reintialize
    return this.db.list('businessCards').valueChanges();
  }

  addHistory(behavior: string) {
    var time = new Date().toLocaleString();
    this.db.list('history').push({log: behavior, timeStamp: time});
  }

  searchName(nameGroup: any[]) {
    const valiName: string[] = [];
    nameGroup.forEach((fullname: string) => {  // each fullname candidate

      const names = fullname.trim().split(" ");
      console.log("names in searchName function");
      console.log(names); 
      //console.log(names[0]);

      const fName = names[0].toLowerCase();
      const lName = names.slice(-1)[0].toLowerCase(); // get last ele
      

      // check first name
      if (this.checkFirName(fName)){
        valiName.push(fName);
      }else{
        valiName.push("not matched first name found, please correct it");
      }

      // check last name
      if (this.checkLstName(lName)){
        valiName.push(lName);
      }else{
        valiName.push("not matched last name found, please correct it");
      }
    });

    return valiName;
  }

  checkFirName(firstName: string) {
    var fname = this.db.object('names/first-names/' + firstName).snapshotChanges();
    return fname.switchMap(fname_ => {
      return of(fname_.payload.val() === true);
    })
  }

  checkLstName(lastName: string) {
    var lname = this.db.object('names/last-names/' + lastName).snapshotChanges();
    return lname.switchMap(lname_ => {
      return of(lname_.payload.val() === true);
    })
  }

}
