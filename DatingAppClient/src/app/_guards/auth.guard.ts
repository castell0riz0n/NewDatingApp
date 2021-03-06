import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AccountService} from "../_services/account.service";
import {ToastrService} from "ngx-toastr";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountSv: AccountService, private toaster: ToastrService ) {
  }
  canActivate(): Observable<boolean>{
    return this.accountSv.currentUser$.pipe(
      map(user => {
        if (user) return true;
        this.toaster.error('You Shall not pass')
      })
    )
  }

}
