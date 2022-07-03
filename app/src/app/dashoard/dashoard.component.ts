import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockServiceService } from '../services/stock-service.service';

@Component({
  selector: 'app-dashoard',
  templateUrl: './dashoard.component.html',
  styleUrls: ['./dashoard.component.scss']
})
export class DashoardComponent implements OnInit {

  enteredValue: string;
  stocksList = [];
  data  = [];
  dummyArr: [] = [];
  finalObj: object = {};
  
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
          (res) => {
            let obj = {};
            obj = {
              ...res,
              'symbol': element
            }
            this.stockService.searchStocks(element).subscribe((resp) => {
              this.finalObj = {
                ...obj,
                'description': resp.result[0]?.description
              }
              this.data.push(this.finalObj);
            });
          });
      });
    } else if (value) {
      this.stockService.getStocksData(value).subscribe(
        (res) => {
          let obj = {};
          obj = {
            ...res,
            'symbol': value
          }
          this.stockService.searchStocks(value).subscribe((resp) => {
            this.finalObj = {
              ...obj,
              'description': resp.result[0]?.description
            }
            this.data.push(this.finalObj);
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
      if (element == item.symbol) {
        this.stocksList.splice(index, 1);
      }
    });
    localStorage.setItem("stocks", JSON.stringify(this.stocksList));
  }

  // Navigate to component
  redirectTo(item) {
    this.stockService.setItem(item.description);
    this.router.navigate(['sentiment' + `/${item.symbol}`]);
  }
}
