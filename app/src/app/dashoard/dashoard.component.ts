import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashoard',
  templateUrl: './dashoard.component.html',
  styleUrls: ['./dashoard.component.scss']
})
export class DashoardComponent implements OnInit {

  enteredValue: any;
  stocksList= [];
  token: any;
  data: any = [];
  dummyArr: any = [];
  finalObj: any = {};
  someObj: any;

  constructor(private http: HttpClient, private router: Router,) {
    this.token = 'bu4f8kn48v6uehqi3cqg';
    localStorage.setItem("apiKey", this.token);
  }


  ngOnInit(): void {
    this.getStockData();
  }


  // Getting stocks data
  getStockData(value?) {
    let baseUrl = 'https://finnhub.io/api/v1'
    let api_key = localStorage.getItem('apiKey');
    this.stocksList = JSON.parse(localStorage.getItem('stocks'));
    if (!value && this.stocksList?.length > 0) {
      this.stocksList.forEach(element => {
        let api = `${baseUrl}/quote?symbol=${element}&token=${api_key}`;
        let searchApi = `${baseUrl}/search?q=${element}&token=${api_key}`;
        this.http.get(api).subscribe(
          (res: any) => {
            let obj = {};
            obj = {
              ...res,
              'symbol': element
            }
            this.http.get(searchApi).subscribe((resp: any) => {
              this.finalObj = {
                ...obj,
                'description': resp.result[0]?.description
              }
              this.data.push(this.finalObj);
            });
          });
      });
    } else if (value) {
      let api = `${baseUrl}/quote?symbol=${value}&token=${api_key}`;
      let searchApi = `${baseUrl}/search?q=${value}&token=${api_key}`;
      this.http.get(api).subscribe(
        (res: any) => {
          let obj = {};
          obj = {
            ...res,
            'symbol': value
          }
          this.http.get(searchApi).subscribe((resp: any) => {
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
    this.router.navigate(['sentiment' + `/${item.symbol}`]);
  }
}
