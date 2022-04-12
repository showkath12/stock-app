import { Component, OnInit } from '@angular/core';

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
  constructor() {

  }


  ngOnInit(): void {
  }


}
