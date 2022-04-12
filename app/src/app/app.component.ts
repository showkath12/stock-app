import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  /**write code here */
  enteredValue: any;
  newArr = [];
  token: any;
  data: any = [];
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
          res => {
            this.http.get(searchApi).subscribe((resp: any) => {
              this.data.push(res);
            });
          });
      });
    } else if (value) {
      let api = `${baseUrl}/quote?symbol=${value}&token=${api_key}`;
      this.http.get(api).subscribe(
        res => {
          this.data.push(res);
        });
    }
  }

  // Adding stocks to local storage
  storeData() {
    this.newArr = this.newArr || [];
    this.newArr.push(this.convertToUpperCase(this.enteredValue));
    localStorage.setItem("stocks", JSON.stringify(this.newArr));
    this.getStockData(this.convertToUpperCase(this.enteredValue));
    this.enteredValue = "";
  }

  convertToUpperCase(event) {
    let item = event.toUpperCase();
    return item;
  }

  removeItem(i) {
    this.data.splice(i, 1);
  }

  redirectTo() {
    this.router.navigate(['sentiment' + `/TSLA`]);
  }

}
