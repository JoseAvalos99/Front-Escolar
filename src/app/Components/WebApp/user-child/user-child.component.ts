import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-child',
  templateUrl: './user-child.component.html',
  styleUrls: ['./user-child.component.css']
})
export class UserChildComponent implements OnInit {
  @Input('name') txtName:string;
  
  constructor() { }

  ngOnInit() {
  }

}
