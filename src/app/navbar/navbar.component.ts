import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user : any;
  navbarCollapsed = true;

  toggleNavbarCollapsing() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  constructor(private auth: AuthService, private router : Router) {
    this.auth.user.subscribe((x: any)=>{
     this.user = x;
    })
  }

  ngOnInit(): void {
  }

  login() {
    this.navbarCollapsed = !this.navbarCollapsed;
    this.router.navigate(['/login']);
  }

  logout() {
    this.navbarCollapsed = !this.navbarCollapsed;
    this.auth.logout();
    this.router.navigate(['/booksList']);
  }
}
