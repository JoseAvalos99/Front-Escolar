import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
import { ToastrService } from 'ngx-toastr';
import { IUser } from 'src/app/Model/user.interface';
import Swal from "sweetalert2";

@Component({
	selector: 'app-user-father',
	templateUrl: './user-father.component.html',
	styleUrls: ['./user-father.component.css']
})
export class UserFatherComponent implements OnInit {
	@Output() idChange = new EventEmitter();
	UserForm: FormGroup;
	filterUser = "";
	public userList: IUser[] = [];
	id: number = 0;
	constructor(private _userService: UserService, private toastr: ToastrService) {
	}

	ngOnInit() {
		this._userService.getUsers().subscribe(
			data => {
				this.userList = data;
			}, error => {
				this.toastr.error(error.error, 'Error');
			}
		);
	}
	AddOrEditUser(data: IUser) {
		if (data.id) {
			console.log('update');
			this._userService.updateUser(data).subscribe(
				data => {
					console.log(data);
					location.reload();
				},
				error => console.log()
			)
		} else {
			console.log('nuevo');
			this._userService.addUser(data).subscribe(
				data => {
					console.log(data);
					location.reload();
				}, error => console.log(error)
			)
		}
	}
	deleteUser(id: number, index: number) {
		Swal.fire({
		  title: "¿Estas seguro de eliminarlo?",
		  text: "No podras recuperar esta informacion",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#3085d6",
		  cancelButtonColor: "#d33",
		  confirmButtonText: "Eliminalo!"
		}).then(result => {
		  if (result.value) {
			this._userService.deleteUser(id).subscribe(data => location.reload());
		  }
		});
	  }
	editUser(Id: number) {
		this.id = Id;
	}

}
