import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../Model/user.interface';

@Pipe({
	name: 'filter'
})
export class FilterPipe implements PipeTransform {

	transform(Users: IUser[], arg: any): any {
		const resultUser: IUser[] = [];
		for (const user of Users) {
			if (user.name.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
				user.lastName.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
				user.yearsOld.toString().indexOf(arg) > -1)
				resultUser.push(user);
		}
		return resultUser;
	}
}


