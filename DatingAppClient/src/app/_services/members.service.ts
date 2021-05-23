import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_BASE_URL} from "./services.module";
import {Observable} from "rxjs";
import {IMember} from "../_models/member.interface";

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private baseUrl: string;

  constructor(private http:HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getMembers(): Observable<IMember[]>{
    return this.http.get<IMember[]>(this.baseUrl + '/Users/GetAll');
  }

  getMember(username: string): Observable<IMember> {
    return this.http.get<IMember>(this.baseUrl + '/Users/Get/' + username)
  }
}
