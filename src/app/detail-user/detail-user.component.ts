import { Component, OnInit,OnDestroy  } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import  { User } from "../model/user.model";
import { DatePipe } from '@angular/common';
import {Subject} from 'rxjs';



@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
  id: any;
  detail_by_id : any;
  constructor( private router: Router, 
    private userService: UserService,
    public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('detailUserId');
    this.userService.getUserById(this.id)
      .subscribe(data =>{
        let datas = data
            data.birdDate = this.datepipe.transform(datas.birdDate, 'yyyy-MM-dd');
            data.basicSallary = this.formatRupiah(datas.basicSallary);
            data.description = this.datepipe.transform(datas.description, 'yyyy-MM-dd');
            console.log(data.basicSallary)


        this.detail_by_id = datas;
    
  });

  }

  formatRupiah(numb){
    const format = numb.toString().split('').reverse().join('');
    const convert = format.match(/\d{1,3}/g);
    const rupiah = 'Rp ' + convert.join('.').split('').reverse().join('')
    
    return rupiah
  }

  backList() {   
    this.router.navigate(['list-user']);
  }

  onEditLayer(id){
    localStorage.removeItem("editItemId");
    localStorage.setItem("editItemId",id);
    this.router.navigate(['edit-user']);
  }

}