import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/Services/user.service";
import { Observable } from "rxjs";
import { IUser } from "src/app/Model/user.interface";
import Swal from "sweetalert2";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  public userList: IUser[] = [];
  filterUser = "";

  constructor(private _userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this._userService.getUsers().subscribe(
      data => {
        this.userList = data;
      }, error => {
        this.toastr.error(error.error,'Error',{
          timeOut: 8000
        });
      }
    );
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
  saveUser(user:IUser){
    if(user.id){
      this._userService.updateUser(user).subscribe(
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
    }else {
      this._userService.addUser(user).subscribe(
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
  }
}
