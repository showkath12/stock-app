import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StockServiceService } from '../services/stock-service.service';

@Component({
  selector: 'app-sentiment-details',
  templateUrl: './sentiment-details.component.html',
  styleUrls: ['./sentiment-details.component.scss']
})
export class SentimentDetailsComponent implements OnInit {

  dataObj = [];
  stockName : string;
  stockSymbol: string;
  dataList = []
  stockObj :any;

  constructor(private stockService: StockServiceService, private route: ActivatedRoute) {
    this.stockObj = this.stockService.getItem();
    console.log(this.stockObj)
    this.stockName = this.stockObj?.description;
    this.stockSymbol = this.route.snapshot.params.symbol;
  }

  ngOnInit(): void {
    this.loadSentimentDetails();
  }

  loadSentimentDetails() {
    this.stockService.sentimentDetails(this.stockSymbol).subscribe(res => {
      this.dataObj = res?.data;
      this.dataObj.forEach(element => {
        if (element.year === 2022) {
          this.dataList.push(element);
        }
      });
    })
  }

}
