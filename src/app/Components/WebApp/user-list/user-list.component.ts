import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/Model/user.interface';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

	public userList: IUser[] = [];
	filterUser = '';

	constructor(private _userService: UserService) { }

	ngOnInit() {
		this._userService.getUsers().subscribe(data => this.FillData(data));
	}
	FillData(data: any) {
		this.userList = data;
		console.log(this.userList);
	}
	refreshList(){

	}

	deleteUser(id: number, index: number) {
		this.userList.slice(index, 0)
		console.log(this.userList);
		
		Swal.fire({
			title: '¿Estas seguro de eliminarlo?',
			text: "No podras recuperar esta informacion",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Eliminarlo!'
		}).then((result) => {
			if (result.value) {
				this._userService.deleteUser(id).subscribe(data => console.log());
			}
		});
	}
}
