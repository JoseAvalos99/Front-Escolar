import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor() { 
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
      console.log(this.UserForm.value);
      this.onResetForm();
    }else
      console.log('No valid');
  }
  
  get name(){return this.UserForm.get('Name')}
}