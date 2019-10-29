import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IUser } from 'src/app/Model/user.interface';
import { UserService } from 'src/app/Services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-user-child',
	templateUrl: './user-child.component.html',
	styleUrls: ['./user-child.component.css']
})
export class UserChildComponent implements OnInit {
	@Input('data') UserFormFather: FormGroup;
	@Output() OnSaveUser = new EventEmitter<IUser>();
	@Input('Id') id: number;

	constructor(private _userService: UserService, private toastr: ToastrService) { }

	ngOnInit() {
		this.UserFormFather = this.CreateFormGroup();
		console.log(this.id);
	}
	ngOnChanges(changes: SimpleChanges): void {
		if (this.id != 0) {
			this._userService.getUser(this.id).subscribe(
				data => {
					this.UserFormFather = new FormGroup({
						id: new FormControl(data.id),
						Name: new FormControl(data.name, [Validators.required, Validators.minLength(4)]),
						LastName: new FormControl(data.lastName, [Validators.required]),
						NickName: new FormControl(data.nickName, [Validators.required]),
						YearsOld: new FormControl(data.yearsOld, [
							Validators.required,
							Validators.min(18),
							Validators.max(99)
						]),
						Gender: new FormControl(data.gender, [Validators.required]),
						PhoneNumber: new FormControl(data.phoneNumber, [Validators.required])
					});
				}, error => {
					this.toastr.error(error.error, 'Error');
				}
			);
		}
	}
	CreateFormGroup() {
		return new FormGroup({
			Name: new FormControl("", [Validators.required, Validators.minLength(4)]),
			LastName: new FormControl("", [Validators.required]),
			NickName: new FormControl("", [Validators.required]),
			YearsOld: new FormControl("", [
				Validators.required,
				Validators.min(18),
				Validators.max(99)
			]),
			Gender: new FormControl("", [Validators.required]),
			PhoneNumber: new FormControl("", [Validators.required])
		});
	}
	CreateFormGroupWithData(user: IUser) {
		return new FormGroup({
			Name: new FormControl(user.name, [Validators.required, Validators.minLength(4)]),
			LastName: new FormControl(user.lastName, [Validators.required]),
			NickName: new FormControl(user.nickName, [Validators.required]),
			YearsOld: new FormControl(user.yearsOld, [
				Validators.required,
				Validators.min(18),
				Validators.max(99)
			]),
			Gender: new FormControl(user.gender, [Validators.required]),
			PhoneNumber: new FormControl(user.phoneNumber, [Validators.required])
		});
	}
	onSaveform() {
		this.OnSaveUser.emit(this.UserFormFather.value);
	}
	get name() {
		return this.UserFormFather.get("Name");
	}
	get lastName() {
		return this.UserFormFather.get("LastName");
	}
	get nickName() {
		return this.UserFormFather.get("NickName");
	}
	get yearsOld() {
		return this.UserFormFather.get("YearsOld");
	}
	get gender() {
		return this.UserFormFather.get("Gender");
	}
	get phoneNumber() {
		return this.UserFormFather.get("PhoneNumber");
	}
}
