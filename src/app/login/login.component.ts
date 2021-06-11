import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService,  private router : Router) { }

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email,
                                Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    logInEmail: new FormControl('', [Validators.required, Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    logInPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  loginForm = new FormGroup({
   
  });

  username = this.form.get("username");
  email = this.form.get("email");
  password = this.form.get("password");
  loginEmail = this.form.get("logInEmail");
  loginPassword = this.form.get("logInPassword");
  signIn = true;
  signIntext = "Existing user? Click here to Log in";

  ngOnInit(): void {
  }
  siginWithGoogle() {
    this.auth.siginWithGoogle();
    this.router.navigate(['/booksList']);
  }
  switchLoginSignin() {
    this.signIn = !this.signIn;
    if(this.signIn) 
      this.signIntext = "Existing user? Log in here"
    else this.signIntext = "New User? Click here to Sign in"
  }

  isSignIn() {
    return this.signIn;
  }

  signInWithEmail() {
    if(!this.email?.valid) {
      this.email?.markAsTouched();
    }
    if(!this.username?.valid) {
      this.username?.markAsTouched();
    }
    if(!this.password?.valid) {
      this.password?.markAsTouched();
    }

    if(this.email?.valid && this.username?.valid && this.password?.valid) {
      var response = this.auth.signupwithEmail(this.email?.value, this.password?.value, this.username?.value)
          .then((doc)=>{
            if(!doc){
              this.form.setErrors({
                invalidSignIn : true
              });
            }
          });
     }

  }

  logInWithEmail() {
    if(!this.loginEmail?.valid) {
      this.loginEmail?.markAsTouched();
    }
    if(!this.loginPassword?.valid) {
      this.loginPassword?.markAsTouched();
    }

    if(this.loginEmail?.valid && this.loginPassword?.valid) {
      debugger;
      var response = this.auth.logInWithEmail(this.loginEmail?.value, this.loginPassword?.value)
          .then((doc)=>{
            if(!doc){
              this.form.setErrors({
                invalidLogin : true
              });
            }
          });
    }
  }

}
