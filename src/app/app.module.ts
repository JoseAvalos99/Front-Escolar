//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

//Componentes
import { AppComponent } from './app.component';
import { UserComponent } from './Components/WebApp/user/user.component';
import { UserListComponent } from './Components/WebApp/user-list/user-list.component';

//Servicios
import { UserService } from './Services/user.service';

//Pipes 
import { FilterPipe } from './Pipes/filter.pipe';
import { UserChildComponent } from './Components/WebApp/user-child/user-child.component';
import { UserFatherComponent } from './Components/WebApp/user-father/user-father.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserListComponent,
    FilterPipe,
    UserChildComponent,
    UserFatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
