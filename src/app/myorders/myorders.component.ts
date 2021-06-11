import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {
  
  id : any;
  docsList: any[] = [];
  title: any;

  constructor(private db: AngularFireDatabase, private router: ActivatedRoute) { 
  
  }

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');

    this.db.list('/BooksList/' + this.id).snapshotChanges()
    .subscribe(list => {
      list.forEach((doc) => {
        let details = {
          imgSrc: doc.payload.val(),
          id : doc.payload.key
        }
        this.docsList.push(details);
      });
     });

     this.db.list('/Books/' + this.id).snapshotChanges()
    .subscribe(list => {
      list.forEach((doc) => {
        let details = {
          prop: doc.payload.val(),
          id : doc.payload.key
        }
        if(details.id == "title")
            this.title = details;
      });
     });

  }

}
