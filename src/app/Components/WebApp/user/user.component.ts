import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from "@angular/forms";
import { UserService } from 'src/app/Services/user.service';
import { IUser } from 'src/app/Model/user.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user:IUser = {
    id:1,
    gender: 0,
    lastName:'',
    name:'',
    nickName: '',
    phoneNumer: '',
    yearsOld:0

  }

  constructor(private _userService:UserService) { 
    this.UserForm = this.CreateFormGroup();
  }


  ngOnInit() {
  }
  UserForm : FormGroup;

  CreateFormGroup(){
    return new FormGroup({
      Name : new FormControl('',[
        Validators.required,
         Validators.minLength(4),
        ]),
      LastName: new FormControl(''),
      NickName: new FormControl(''),
      YearsOld : new FormControl(''),
      Gender: new FormControl(''),
      PhoneNumber: new FormControl('')
    });
  }
  onResetForm(){
    this.UserForm.reset();
  }
  onSaveForm(){
    if(this.UserForm.valid){
      this.user.id = 1;
      this.user.name = this.UserForm.get('Name').value;
      this.user.lastName = this.UserForm.get('LastName').value;
      this.user.nickName = this.UserForm.get('NickName').value;
      this.user.yearsOld = this.UserForm.get('YearsOld').value;
      this.user.gender = this.UserForm.get('Gender').value[0];
      this.user.phoneNumer = this.UserForm.get('PhoneNumber').value;
      
      console.log(this.user);
      this._userService.addUser(this.user).subscribe(data => console.log(data));
    }else
      console.log('No valid');
  }
  
  get name(){return this.UserForm.get('Name')}
}