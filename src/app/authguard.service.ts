import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{

  constructor(private auth: AuthService, private router : Router) { }

  canActivate() {
    if(this.auth.userProfile)
      return true;
     
    this.router.navigate(["/login"]);
    return false;    
  }
}
