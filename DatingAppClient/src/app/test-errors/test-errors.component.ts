import {Component, Inject, OnInit, Optional} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_BASE_URL} from "../_services/services.module";

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.scss']
})
export class TestErrorsComponent implements OnInit {

  baseUrl: string;
  validationErrors: string []= [];

  constructor(private http: HttpClient,
              @Optional() @Inject(API_BASE_URL) baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  ngOnInit(): void {
  }

  get404Error() {
    this.http.get(this.baseUrl + '/api/buggy/GetNotfound').subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    })
  }
  get400Error() {
    this.http.get(this.baseUrl + '/api/buggy/GetBadRequest').subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    })
  }
  get500Error() {
    this.http.get(this.baseUrl + '/api/buggy/ServerError').subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    })
  }
  get401Error() {
    this.http.get(this.baseUrl + '/api/buggy/auth').subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    })
  }
  get400ValidationError() {
    this.http.post(this.baseUrl + '/api/account/register', {
      username: '',
      password: ''
    }).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
      this.validationErrors = error;
    })
  }
}
