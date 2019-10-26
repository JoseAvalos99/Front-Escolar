import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "src/app/Services/user.service";
import { IUser } from "src/app/Model/user.interface";
import { ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  user: IUser = {
    id: 0,
    gender: 0,
    lastName: "",
    name: "",
    nickName: "",
    phoneNumber: "",
    yearsOld: 0
  };
  UserForm: FormGroup;

  constructor(
    private _userService: UserService,
    private route: ActivatedRoute
  ) {
    this.UserForm = this.CreateFormGroup();
    this.route.params.subscribe(params => {
      this.user.id = params["id"];
      this._userService.getUser(this.user.id).subscribe(data => {
        this.user = data;
        this.UserForm.controls["Name"].setValue(this.user.name);
        this.UserForm.controls["LastName"].setValue(this.user.lastName);
        this.UserForm.controls["NickName"].setValue(this.user.nickName);
        this.UserForm.controls["YearsOld"].setValue(this.user.yearsOld);
        this.UserForm.controls["Gender"].setValue(this.user.gender);
        this.UserForm.controls["PhoneNumber"].setValue(this.user.phoneNumber);
      });
    });
  }

  ngOnInit() {}
  CreateFormGroup() {
    return new FormGroup({
      Name: new FormControl("", [Validators.required, Validators.minLength(4)]),
      LastName: new FormControl(""),
      NickName: new FormControl(""),
      YearsOld: new FormControl(""),
      Gender: new FormControl(""),
      PhoneNumber: new FormControl("")
    });
  }
  onResetForm() {
    this.UserForm.reset();
  }
  onSaveForm() {
    if (this.UserForm.valid) {
		this.user.name = this.UserForm.get("Name").value;
        this.user.lastName = this.UserForm.get("LastName").value;
        this.user.nickName = this.UserForm.get("NickName").value;
        this.user.yearsOld = this.UserForm.get("YearsOld").value;
        this.user.gender = this.UserForm.get("Gender").value[0];
        this.user.phoneNumber = this.UserForm.get("PhoneNumber").value;
      if (this.user.id != 0) {
        this._userService.updateUser(this.user).subscribe(
          data => {
            Swal.fire({
              type: "success",
              title: "El usuario ha sido actualizado correctamente",
              showConfirmButton: true,
              timer: 1500
            });
          },
          error => {
            Swal.fire({
              type: "error",
              title: "Oops...",
              text: "El servidor cree que algunos de tus datos estan mal!",
              footer: "Verifica que todo este completo por favor"
            });
          }
        );
      } else {
        this.user.id = 0;
        this._userService.addUser(this.user).subscribe(
          data => {
            Swal.fire({
              type: "success",
              title: "El usuario ha sido guardado correctamente",
              showConfirmButton: true,
              timer: 1500
            });
          },
          error => {
            Swal.fire({
              type: "error",
              title: "Oops...",
              text: "El servidor cree que algunos de tus datos estan mal!",
              footer: "Verifica que todo este completo por favor"
            });
          }
        );
      }
    } else console.log("No valid");
  }

  get name() {
    return this.UserForm.get("Name");
  }
}
