import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginguardService implements CanActivate{

  constructor(private auth: AuthService, private router : Router) { }

  canActivate() {
    return true;  
  }
}
