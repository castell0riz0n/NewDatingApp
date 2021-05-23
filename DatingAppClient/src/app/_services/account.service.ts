import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from './services.module';
import { map } from 'rxjs/operators';
import { IUser } from '../_models/user.interface';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl: string;

  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.baseUrl = baseUrl ? baseUrl : "";
  }

  login(model: any) {
    return this.http.post(this.baseUrl + "/account/login", model)
      .pipe(map((res: IUser) => {
        const user = res;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      }))
  }

  register(model: any) {
    return this.http.post(this.baseUrl + '/account/register', model)
      .pipe(map((user: IUser) => {
        if (user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      }))

  }

  setCurrentUser(user: IUser) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
