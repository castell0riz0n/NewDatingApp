import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IUser } from './_models/user.interface';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Dating App!';
  constructor(private accountSv: AccountService) {
  }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: IUser = JSON.parse(localStorage.getItem('user'));
    this.accountSv.setCurrentUser(user);
  }

}
