// Xiao Lin(ID:1806915)
// AppUrl: https://github.com/NicopandaLim/business-cards.git

import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BusinessCard } from '../models/business-card';

import { DashboardService } from './dashboard.service';
import { TakepictureService } from '../takepicture/takepicture.service';
declare var gtag: Function;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  imgBase64: string;
  dataUrl: string;
  cards: any[];
  foundCards = [];
  result: any;
  curr_card: any;
  diplayCamComponent: boolean = false;
  displayFoundcards: boolean = false;
  displayJustAddCard: boolean = false;
  wannaCorrectName: boolean = false;
  displayTextDetection: boolean = false;
  

  constructor(private http: HttpClient,
              private dashboardService: DashboardService,
              private takepicService: TakepictureService 
              ) { 
    this.cards = [];
  }

  async textDetection() {
    console.log("text function is called");
    this.imgBase64 = this.takepicService.base64;
    this.dataUrl = this.takepicService.dataUrl;
    console.log("dataUrl:");
    console.log(this.dataUrl);    

    const request: any = {
      'requests': [
        {
          'image': {
            'content': this.imgBase64,
            'source': {
            },
          },
          'features': [
            {
              'type': 'TEXT_DETECTION',
              'maxResults': 1,
            }
          ]
        }
      ]
    };
    console.log("requesting the text.....");
    const url = `https://vision.googleapis.com/v1/images:annotate?key=${environment.CSC436}`;
    await this.http.post(
      url,
      request
    ).subscribe( (results: any) => {
      console.log('RESULTS RESULTS RESULTS');
      console.log(results);
      console.log('RESULTS RESULTS RESULTS');

      this.parseBusinessCard(results['responses'][0]['textAnnotations'][0]['description']);
      
      this.displayJustAddCard = true;

     this.addHistory("User performed text detection on business card."); 

    });

  }

  parseBusinessCard(cardText: string) {
    console.log("The cardText got in parsing function");
    console.log(cardText);

    this.curr_card = new BusinessCard();
    
    this.curr_card.imageUri = this.dataUrl;

    var names = this.parseName(cardText);
    this.curr_card.firstName = names[0];
    this.curr_card.lastName = names[1];

    this.curr_card.phoneNumber = this.parsePhoneNumber(cardText); 

    this.curr_card.email = this.parseEmail(cardText);

    var info = cardText.split('\n').slice(0,-1);
    this.curr_card.extraText = info.slice(-1)[0].toLowerCase();

  }

  parseName(text:string) {
    var nameCandis = [];
    var validName: string[];
    var words = text.split('\n');

    words = words.slice(0,-1); // remove "" at the end
    console.log("words:");
    console.log(words);

    //const nameRegex = new RegExp(/(.+)(?:\s[^\s]+)?\s(\w+).*/gm);
    const nameRegex = new RegExp(/\d/g);  // string w/o digits
    const nameRegex2 = new RegExp(/[()@-]/g);
    const nameRegex3 = /com/;
    const nameRegex4 = /edu/;
    words.forEach(word =>{
      const test1 = nameRegex.test(word);  //["Tom Green", "Tom", "Green"]
      const test2 = nameRegex2.test(word);
      const test3 = nameRegex3.test(word);
      const test4 = nameRegex4.test(word);

      if (!test1 && !test2 && !test3 && !test4) {
        nameCandis.push(word);
      }
    });
    console.log("name extracted:");
    console.log(nameCandis);

    validName = this.dashboardService.searchName(nameCandis);
    console.log("validated name: ");
    console.log(validName);

    return nameCandis !== null ? nameCandis : [];

  }

  parsePhoneNumber(text: string):string {
    const pnRegex = new RegExp(/(\(?(\d\d\d)\)?)?\D(\d\d\d)\D(\d\d\d\d)/, 'g');
    var phoneNumber = pnRegex.exec(text);
    return phoneNumber !== null ? phoneNumber[0] : '';
  }

  parseEmail(text:string) {
    const emailRegex = new RegExp(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
    var email = emailRegex.exec(text);
    return email !== null ? email[0] : '';
  }



  // iteract with firebase
  addBusinessCard(bc: BusinessCard) {
    this.dashboardService.addBusinessCard(bc);
  }

  saveCardToFireBase() {
    this.dashboardService.addBusinessCard(this.curr_card);
    this.addHistory("User saved new business card to database");
    this.displayJustAddCard = false;
    this.diplayCamComponent = false;
    this.displayTextDetection = false;
    gtag('event', 'User added a new business card');
  }

  getBusinessCards() {   // update this.cards when add a new card
    this.dashboardService.getBusinessCards().subscribe((cards: any) => {
      this.cards = cards;
    });
  }

  addHistory(action: string) {
    this.dashboardService.addHistory(action);
  }

  searchBusinessCard(fname: string, lname: string) {   // search by name
    this.foundCards = [];
    const behavior = 'User searched on' + fname + " " + lname;  // log
    this.addHistory(behavior);

    this.cards.forEach(card => {
      if (card.firstName == fname.trim().toLowerCase() && card.lastName == lname.trim().toLowerCase()){
        this.foundCards.push(card);
      }
    });
    console.log('foundcards:');
    console.log(this.foundCards);
    this.displayFoundcards = true;
  }

  goToaddCard(){
    this.diplayCamComponent = true;
    this.displayTextDetection = true;
    this.displayFoundcards = false;
  }

  // correct the name
  goToCorrectName() {
    this.wannaCorrectName = true;
  }

  correctName(fname: string, lname: string) {
    this.curr_card.firstName = fname.toLowerCase();
    this.curr_card.lastName = lname.toLowerCase();

    this.wannaCorrectName = false;
    this.addHistory("user performed name Correction on the business card.")
  }


  ngOnInit() {
    this.dashboardService.getBusinessCards().subscribe((cards) => {
        this.cards = cards;
        console.log('Fetch business cards successfully!');
        console.log(cards);
      },
      (error) => {
        console.log('Fetching business cards went wrong!');
      }
    );
  }

}
