import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/Model/user.interface';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

	public userList = [];

	constructor(private _userService: UserService) { }

	ngOnInit() {
		this._userService.getUsers().subscribe(data => console.log(data));
	}

}
