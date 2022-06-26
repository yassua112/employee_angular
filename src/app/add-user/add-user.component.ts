import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../service/user.service";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";

interface group {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

 

export class AddUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private userService: UserService) { }

  addForm: FormGroup;
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
    this.addForm = this.formBuilder.group({
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

  }

  onSubmit() {
    this.userService.createUser(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['list-user']);
      });
  }

  backList() {   
        this.router.navigate(['list-user']);
  }

}
