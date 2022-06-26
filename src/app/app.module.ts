import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {routing} from "./app.routing";
import {AuthenticationService} from "./service/auth.service";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AddUserComponent } from './add-user/add-user.component';
import {EditUserComponent } from './edit-user/edit-user.component';
import {ListUserComponent} from "./list-user/list-user.component";

import {UserService} from "./service/user.service";
// import { SidenavComponent } from './sidenav/sidenav.component';
import { DataTablesModule } from "angular-datatables";
import { DatePipe } from '@angular/common';

import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchPipe } from './service/pipesearch';
import { DetailUserComponent } from './detail-user/detail-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListUserComponent,
    AddUserComponent,    
    DetailUserComponent,
    EditUserComponent,
    SearchPipe
    
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    NgxMatSelectSearchModule,
    BrowserAnimationsModule
  ],
  providers: [AuthenticationService, UserService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
