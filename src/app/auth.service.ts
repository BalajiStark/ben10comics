import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { LoginComponent } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user : Observable<firebase.User | null>;
  userProfile : any;
  error: any = false;
  constructor(private auth: AngularFireAuth, private router : Router) {
    this.user = auth.authState;
    this.auth.user.subscribe((x: any)=>{
      this.userProfile = x;
    })
   }

  siginWithGoogle() {
    this.auth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  async signupwithEmail(email: string, password: string, name: string) {
    try {
      const value = await this.auth.auth
        .createUserWithEmailAndPassword(email, password);
      value.user?.updateProfile({
        displayName: name,
      }).then(() => {
        this.router.navigate(['/booksList']);
        return true;
      }, function (error) {
        console.log('Something went wrong:', error.message);
        return false;
      });
    } catch (err) {
      this.error = true;
      console.log('Something went wrong:', err.message);
      return false;
    }
    return true;
  }

  async logInWithEmail(email: string, password: string) {
    this.auth.auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      this.router.navigate(['/booksList']);
      return true;
    })
    .catch(err => {
      return false;
    });
    return false;
  }

  logout() {
    this.auth.auth.signOut();
  }
}
