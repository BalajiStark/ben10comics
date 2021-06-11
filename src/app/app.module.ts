import { AuthguardService } from './authguard.service';
import { AuthService } from './auth.service';
import { environment } from './../environments/environment';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { MyordersComponent } from './myorders/myorders.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginguardService } from './loginguard.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CharactersComponent } from './characters/characters.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppinglistComponent,
    MyordersComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    CharactersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'booksList', component: ShoppinglistComponent},
      {path: 'myOrders/:id', component: MyordersComponent, canActivate: [AuthguardService]},
      {path: 'login', component: LoginComponent},
      {path: 'characters', component: CharactersComponent},
    ])
  ],
  providers: [
    AuthService,
    AuthguardService,
    LoginguardService,
    NavbarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
