import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {AccountService} from '../_services/account.service';
import {Observable} from 'rxjs';
import {IUser} from '../_models/user.interface';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    public accountSv: AccountService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  login() {
    this.accountSv.login(this.model).subscribe(res => {
      this.router.navigateByUrl('/members')
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  logout() {
    this.accountSv.logout();
    this.router.navigateByUrl('/')
  }
}
