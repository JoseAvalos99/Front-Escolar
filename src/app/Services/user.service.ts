import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { IUser } from '../Model/user.interface';
import { Observable, throwError, } from 'rxjs';
import { catchError, retry } from "rxjs/operators";

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private _url: string = "http://localhost:55407/api/User";

	constructor(private http: HttpClient) { }

	getUsers(): Observable<IUser[]> {
		return this.http.get<IUser[]>(this._url).pipe(retry(1));
	}
	getUser(id: number): Observable<IUser> {
		return this.http.get<IUser>(this._url + '/' + id).pipe(retry(1));
	}
	addUser(user: IUser) {
		return this.http.post(this._url, user).pipe(
			catchError(this.handleError)
		);
	}
	updateUser(user: IUser) {
		return this.http.put(this._url + '/' + user.id, user).pipe(
			catchError(this.handleError)
		);
	}
	deleteUser(Id: number) {
		this._url = this._url + '/' + Id;
		return this.http.delete(this._url).pipe(
			catchError(this.handleError)
		);
	}
	
	private handleError(error: HttpErrorResponse) {
		let ErrorMessage = "";
		if (error.error instanceof ErrorEvent) {
			ErrorMessage = 'Client Error:' + error.error.message;
		} else {

			ErrorMessage = `Server Error: ${error.status} ${error.error} +`;
		}
		console.log(ErrorMessage);
		return throwError(ErrorMessage);
	};

}
