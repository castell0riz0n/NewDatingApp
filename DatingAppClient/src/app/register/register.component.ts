import {Component, EventEmitter, Inject, Input, OnInit, Optional, Output} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {API_BASE_URL} from "../_services/services.module";
import {map} from "rxjs/operators";
import {AccountService} from "../_services/account.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  @Output() cancelRegister = new EventEmitter();

  constructor(private accountService: AccountService,
              private toaster: ToastrService) {
  }

  ngOnInit(): void {
  }

  register() {
    this.accountService.register(this.model).subscribe(res => {
      console.log(res);
      this.cancel();
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.toaster.error(error.error);
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
