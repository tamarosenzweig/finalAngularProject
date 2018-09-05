import { Component, OnInit } from '@angular/core';
import { Store } from '../../shared/models/store.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 myStore:Store;
  constructor() { 
    this.myStore=new Store("my book store","","Jerusalem","king David",17);
  }

  ngOnInit() {
  }

}
