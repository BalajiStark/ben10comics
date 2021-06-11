import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent {

  docsList: any[] = [];
  dupedDocsList: any[] = [];
  Quantity: any = 0;
  cart: any[] =[];

  constructor(private db: AngularFireDatabase,  private router : Router) { 
    db.list('/Books/').snapshotChanges()
    .subscribe(list => {
      this.docsList = [];
      list.forEach((doc) => {
        let details = {
          prop: doc.payload.val(),
          id : doc.payload.key
        }
        this.docsList.push(details);
        this.dupedDocsList.push(details);
      });
     });
  }

  getQuantity(product: any) {
    let val = 0;
    this.cart.forEach(function(rec) {
        if(rec === product.id) {
          val = 1;
        }
    });
    return val;
  }

  increaseQuantity(product: any) {
    this.Quantity++;
    let cartId = localStorage.getItem('cartId');
    if(!cartId) {
    }
    this.cart.push(product.id);
    this.router.navigate(['/myOrders', product.id]);
  }
  decreaseQuantity(product: any) {
    this.Quantity--;
    let dup: any[] = [];

    this.cart.forEach(function(rec) {
      if(rec !== product.id) {
        dup.push(rec);
      }
  });
  this.cart = [];
  this.cart = dup;
  }

}
