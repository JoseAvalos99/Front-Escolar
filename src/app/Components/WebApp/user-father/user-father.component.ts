import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-user-father',
	templateUrl: './user-father.component.html',
	styleUrls: ['./user-father.component.css']
})
export class UserFatherComponent implements OnInit {

	constructor() {
	}
	nameChild: string = "Hola Mundo";

	ngOnInit() {
	}

}
