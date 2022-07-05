import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
//import { AuthService } from './auth.service';
import decode from 'jwt-decode';
import { TokenStorageService } from './token-storage.service';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public auth: TokenStorageService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = this.auth.getToken()
    const user = this.auth.getUser()
    // console.log(user.roles.some((r: any) => expectedRole.includes(r)))
    // console.log(Object.keys(this.auth.getUser()).length == 0)
    // decode the token to get its payload
    //const tokenPayload = decode(token!);
    if (Object.keys(this.auth.getUser()).length == 0) {
      this.router.navigate(['login'],{queryParams: {returnUrl: state.url}});
      return false;
    }else{
        if(!user.roles.some((r: any) => expectedRole.includes(r))){
            this.auth.signOut();
            this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
            return false;
        }
    }
    return true;
  }
}