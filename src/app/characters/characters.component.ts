import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  index = 1;
  constructor(private db: AngularFireDatabase) { }
  docsList: any[] = [];
  src : any;

  ngOnInit(): void {
    this.getCharacterInfo();
  }


  nextClick() {
    this.index++;
    this.index = this.index > 23 ? 1 : this.index;
    this.getCharacterInfo();
  }

  previousClick() {
    this.index--;
    this.index = this.index < 1 ? 23 : this.index;
    this.getCharacterInfo();
  }

  getCharacterInfo() {
    this.db.list('/Characters/'+ this.index).snapshotChanges()
    .subscribe(list => {
      this.docsList = [];
      list.forEach((doc) => {
        let details = {
          prop: doc.payload.val(),
          id : doc.payload.key
        }
        if(details.id !== "imgSrc")
          this.docsList.push(details);
        else this.src = details.prop;
      });
     });
  }
}
