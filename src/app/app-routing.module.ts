import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './Components/WebApp/user/user.component';
import { UserListComponent } from './Components/WebApp/user-list/user-list.component';
import { UserFatherComponent } from './Components/WebApp/user-father/user-father.component';


const routes: Routes = [
  {path:'user', component:UserComponent},
  {path:'user/:id', component:UserComponent},
  {path:'list', component:UserListComponent},
  {path:'father', component:UserFatherComponent},
  {path:'', component:UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
