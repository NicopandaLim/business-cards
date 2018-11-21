import { Component, OnInit } from '@angular/core';
import { HistoryService } from './history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  behaviors: any[];
  constructor(private historyService: HistoryService) {
    this.getBehavHistory();
   }

  getBehavHistory() {
    this.historyService.getBehavHistory().subscribe((behaHistory: any) =>{
      this.behaviors = behaHistory;
    });
  }

  ngOnInit() {
  }

}
