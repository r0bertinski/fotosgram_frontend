import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanLoad {

  constructor( private userService: UserService) {

  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean  {
    return this.userService.validateToken();
  }

  // canActivate(): Observable<boolean> | Promise<boolean> | boolean  {
  //   return false;
  // }

}
