import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../model/user.model";
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8090/api';

  editUser(id: number,user: User){
    return this.http.put(this.baseUrl +'/editemployee/'+ id,user);
  }

  getUsers() {
    /* let fakeUsers = [{id: 1, firstName: 'Dhiraj', lastName: 'Ray', email: 'dhiraj@gmail.com'},
     {id: 1, firstName: 'Tom', lastName: 'Jac', email: 'Tom@gmail.com'},
     {id: 1, firstName: 'Hary', lastName: 'Pan', email: 'hary@gmail.com'},
     {id: 1, firstName: 'praks', lastName: 'pb', email: 'praks@gmail.com'},
   ];
   return Observable.of(fakeUsers).delay(5000);*/
    return this.http.get<User[]>(this.baseUrl+'/getEmployee');
  }

  getUserById(id: number) {
    return this.http.get<User>(this.baseUrl + '/getbyId/' + id);
  }

  createUser(user: User) {
    return this.http.post(this.baseUrl+'/addNewEmployee', user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + '/deletebyid/' + id);
  }




}
