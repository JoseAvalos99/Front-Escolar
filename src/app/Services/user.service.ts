import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IUser } from '../Model/user.interface';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private _url: string = "http://localhost:55407/api/User";

	constructor(private http: HttpClient) { }

	getUsers(): Observable<IUser[]> {
		return this.http.get<IUser[]>(this._url);
	}

}
