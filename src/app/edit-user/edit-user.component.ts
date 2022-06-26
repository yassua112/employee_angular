import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";
import { User } from "../model/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface group {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  selected : any;
  detail_by_id : any;
  id: any;
  firstName: any;
  lastName: any;
  email: any;
  birdDate:any;
  basicSallary: any;
  status: any;
  group:any;
  description:any;
  editForm: FormGroup
  baseUrl: string = 'http://localhost:8090/api';
  constructor(private formBuilder: FormBuilder,private router: Router, private userService: UserService,public datepipe: DatePipe,private http: HttpClient ) { }

  group_data: group[] = [
    {value: 'HR', viewValue: 'HR'},
    {value: 'Developer', viewValue: 'Developer'},
    {value: 'Qualiti Testing', viewValue: 'Qualiti Testing'},
    {value: 'Operation', viewValue: 'Operation'},
    {value: 'Customer Service', viewValue: 'Customer Service'},
    {value: 'Leader', viewValue: 'Leader'},
    {value: 'Departemen Head', viewValue: 'Departemen Head'},
    {value: 'Sercurity', viewValue: 'Sercurity'},
    {value: 'IT Suport', viewValue: 'IT Suport'},
    {value: 'Finance', viewValue: 'Finance'}
  ];
  ngOnInit() {
    this.editForm = this.formBuilder.group({
      id: [],
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      birdDate: ['', Validators.required],
      basicSallary: ['', Validators.required],
      status: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.id = localStorage.getItem('editItemId');
    this.userService.getUserById(this.id)
      .subscribe(data =>{
        let datas = data
            data.birdDate = this.datepipe.transform(datas.birdDate, 'yyyy-MM-dd');
            data.basicSallary = this.formatRupiah(datas.basicSallary);
            data.description = this.datepipe.transform(datas.description, 'yyyy-MM-dd');
           
        this.selected = data.group;
        this.detail_by_id = datas;

      
        
  });


  }

  onSubmit() {    
    
    
  }

  update(id:number ,user: User) {
    console.log(user)
    return this.http.put(this.baseUrl + '/editemployee/'+ id, user);
  }

  updateDataEmployee(){
    this.id = localStorage.getItem("editItemId");
    this.update(this.id,this.editForm.value)
    this.ngOnInit()
    this.router.navigate(['detail-user']);
  }

  formatRupiah(numb){
    const format = numb.toString().split('').reverse().join('');
    const convert = format.match(/\d{1,3}/g);
    const rupiah = 'Rp ' + convert.join('.').split('').reverse().join('')
    
    return rupiah;
  }

  backList() {   
    this.router.navigate(['list-user']);
  }
  
}
