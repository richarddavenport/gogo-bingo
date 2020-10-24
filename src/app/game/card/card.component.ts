import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { Game } from "../../game.model";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"]
})
export class CardComponent implements OnInit {
  doc$: Observable<Game>;

  constructor(private route: ActivatedRoute, private afs: AngularFirestore) {}

  ngOnInit() {
    this.doc$ = this.route.params.pipe(
      tap(params => {
        console.log(params);
      }),
      switchMap(params => {
        return this.afs.doc<Game>(`games/${params["id"]}`).valueChanges();
      })
    );
  }
}
