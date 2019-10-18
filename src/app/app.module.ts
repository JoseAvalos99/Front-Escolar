import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from "@angular/forms";
import { UserComponent } from './Components/WebApp/user/user.component';

import { HttpClientModule } from "@angular/common/http";
import { UserListComponent } from './Components/WebApp/user-list/user-list.component';
import { UserService } from './Services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
