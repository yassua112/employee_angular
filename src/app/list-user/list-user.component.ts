import { Component, OnInit,OnDestroy  } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import  { User } from "../model/user.model";
import { DatePipe } from '@angular/common';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit, OnDestroy  {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  users: User[];
  dates: any;
  // dtTrigger:any;
  dtElement:any
  
  constructor(
    private router: Router, 
    private userService: UserService,
    public datepipe: DatePipe) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };

    this.userService.getUsers()
      .subscribe( data => {

        let datas = data
        for(let i=0;i<datas.length;i++){
            data[i].birdDate = this.datepipe.transform(datas[i].birdDate, 'yyyy-MM-dd');
            data[i].basicSallary = this.formatRupiah(datas[i].basicSallary);
            data[i].description = this.datepipe.transform(datas[i].description, 'yyyy-MM-dd');

            console.log(data[i].basicSallary)
        }
        this.users = data;
        this.dtTrigger.next(event);
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

 
  formatRupiah(numb){
    const format = numb.toString().split('').reverse().join('');
    const convert = format.match(/\d{1,3}/g);
    const rupiah = 'Rp ' + convert.join('.').split('').reverse().join('')
    
    return rupiah
  }
  
  detailUser(id): void {
    localStorage.removeItem("detailUserId");
    localStorage.setItem("detailUserId",id);
    this.router.navigate(['detail-user']);
  };

  deleteUserbyID(id): void {
   this.userService.deleteUser(id)
   .subscribe({
    next: (res) => {
      console.log(res);
      location.reload();
    },
    error: (e) => console.error(e)
  });
  
  };

  addUser(): void {
    this.router.navigate(['add-user']);
  };

}
