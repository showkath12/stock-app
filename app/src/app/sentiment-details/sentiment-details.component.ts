import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StockServiceService } from '../services/stock-service.service';

@Component({
  selector: 'app-sentiment-details',
  templateUrl: './sentiment-details.component.html',
  styleUrls: ['./sentiment-details.component.scss']
})
export class SentimentDetailsComponent implements OnInit {

  dataObj = {};
  stockName: string;

  constructor(private stockService: StockServiceService, private route: ActivatedRoute) {
    this.stockName = this.route.snapshot.params.symbol;
  }

  ngOnInit(): void {
    this.loadSentimentDetails();
  }

  loadSentimentDetails() {
    this.stockService.sentimentDetails(this.stockName).subscribe(res => {
      this.dataObj = res?.data;
    })
  }

}
