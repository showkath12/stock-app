import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StockServiceService } from '../services/stock-service.service';


interface arrayDataList {
    month: number;
    change: number;
    mspr: number;
    year:number; 
}


@Component({
  selector: 'app-sentiment-details',
  templateUrl: './sentiment-details.component.html',
  styleUrls: ['./sentiment-details.component.scss']
})
export class SentimentDetailsComponent implements OnInit {

  // dataObj = [];
  stockfullName : string;
  stockSymbol: string;
  dataList: Array<arrayDataList>=[]

  constructor(private stockService: StockServiceService, private route: ActivatedRoute) {
    this.stockfullName = this.stockService.getItem();
    this.stockSymbol = this.route.snapshot.params.symbol;
  }

  ngOnInit(): void {
    this.loadSentimentDetails();
  }

  loadSentimentDetails() {
    this.stockService.sentimentDetails(this.stockSymbol).subscribe((res) => {
      res?.data.forEach(element => {
        if (element.year === 2022) {
          this.dataList.push(element);
        }
      });
    })
  }

}
