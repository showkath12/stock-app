import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';


interface res {
  data: [
    {
      change: number;
      month: number;
      mspr: number;
      symbol: string;
      year: number;
    }
  ];
}

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


@Injectable({
  providedIn: 'root'
})
export class StockServiceService {

  constructor(private http: HttpClient,) { }


  token: string = 'bu4f8kn48v6uehqi3cqg';
  stockDescription: string;

  setItem(item: string) {
    return (this.stockDescription = item);
  }

  getItem() {
    return this.stockDescription;
  }

  setLocalStorageItem() {
    localStorage.setItem('apiKey', this.token);
  }

  getStocksData(stockName: string) {
    return this.http.get<stockData>(
      `${environment.baseUrl}/quote?symbol=${stockName}&token=${this.token}`
    );
  }

  searchStocks(stockName: string) {
    return this.http.get< searchStockData >(
      `${environment.baseUrl}/search?q=${stockName}&token=${this.token}`
    );
  }

  sentimentDetails(stockName: string) {
    return this.http.get<res>(
      `${environment.baseUrl}//stock/insider-sentiment?symbol=${stockName}&from=2015-01-01&to=2022-03-01&token=${this.token}`
    );
  }
}
