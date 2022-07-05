import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockServiceService } from '../services/stock-service.service';

interface stockData {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
  stockName: string;
  stockCode: string;
}

interface searchStockData {
  result:[
    {
      description: string;
      symbol: string;
      displaySymbol: string;
      type: string;
    }
  ]
}

@Component({
  selector: 'app-dashoard',
  templateUrl: './dashoard.component.html',
  styleUrls: ['./dashoard.component.scss']
})
export class DashoardComponent implements OnInit {

  enteredValue: string;
  stocksList: string[] = new Array();
  data : Array<stockData> = [];
  stockDetails : Array<searchStockData> = [];

  constructor(private stockService:StockServiceService, private router: Router,) {
  }


  ngOnInit(): void {
    this.getStockData();
  }


  // Getting stocks data
  getStockData(value?) {
    this.stocksList = JSON.parse(localStorage.getItem('stocks'));
    if (!value && this.stocksList?.length > 0) {
      this.stocksList.forEach(element => {       
        this.stockService.getStocksData(element).subscribe(
          (res : stockData) => {
            this.stockService.searchStocks(element).subscribe((resp:searchStockData) => {              
              this.data.push({
                ...res,
                stockName: resp.result[0]?.description,
                stockCode: resp.result[0]?.symbol,
              })
            });
          });
      });
    } else if (value) {
      this.stockService.getStocksData(value).subscribe(
        (res: stockData) => {
          this.stockService.searchStocks(value).subscribe((resp:searchStockData) => {            
            this.data.push({
              ...res,
              stockName: resp.result[0]?.description,
              stockCode: resp.result[0]?.symbol,
            })
          });
        });
    }
  }

  // Adding stocks to local storage
  storeData() {
    if (this.enteredValue) {
      this.stocksList = this.stocksList || [];
      console.log(this.enteredValue)
      this.stocksList.push(this.convertToUpperCase(this.enteredValue));
      localStorage.setItem("stocks", JSON.stringify(this.stocksList));
      this.getStockData(this.convertToUpperCase(this.enteredValue));
      this.enteredValue = "";
    }
  }

  // By default converting to uppercase
  convertToUpperCase(event) {
    let item = event.toUpperCase();
    return item;
  }

  // Removing items from the list
  removeItem(i, item) {
    this.data.splice(i, 1);
    this.stocksList.forEach((element, index) => {
      if (element == item.stockCode) {
        this.stocksList.splice(index, 1);
      }
    });
    localStorage.setItem("stocks", JSON.stringify(this.stocksList));
  }
  

  // Navigate to component
  redirectTo(item) {
    this.stockService.setItem(item.stockName);
    this.router.navigate(['sentiment' + `/${item.stockCode}`]);
  }
}
