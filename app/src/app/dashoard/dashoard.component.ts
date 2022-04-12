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
  newArr = [];
  token: any;
  data: any = [];
  dummyArr:any = [];
  finalObj:any = {};
  someObj:any;

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
    this.newArr = JSON.parse(localStorage.getItem('stocks'));
    if (!value && this.newArr?.length > 0) {
      this.newArr.forEach(element => {
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
          console.log(obj)
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
      this.newArr = this.newArr || [];
      this.newArr.push(this.convertToUpperCase(this.enteredValue));
      localStorage.setItem("stocks", JSON.stringify(this.newArr));
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
  removeItem(i) {
    this.data.splice(i, 1);
  }

  // Navigate to component
  redirectTo(item) {
    this.router.navigate(['sentiment' + `/${item.symbol}`]);
  }
}
