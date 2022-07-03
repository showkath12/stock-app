import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockServiceService {

  constructor(private http: HttpClient,) { }


  token: string = 'bu4f8kn48v6uehqi3cqg';
  stockDescription :string;

  setItem(item) {
    return this.stockDescription = item;
  }

  getItem(){
    return this.stockDescription;
  }

  setLocalStorageItem() {
    localStorage.setItem("apiKey", this.token);
  }

  getStocksData(stockName) {
    return this.http.get<any>(`${environment.baseUrl}/quote?symbol=${stockName}&token=${this.token}`);
  }

  searchStocks(stockName) {
    return this.http.get<any>(`${environment.baseUrl}/search?q=${stockName}&token=${this.token}`);
  }

  sentimentDetails(stockName) {
    return this.http.get<any>(`${environment.baseUrl}//stock/insider-sentiment?symbol=${stockName}&from=2015-01-01&to=2022-03-01&token=${this.token}`);
  }

}
