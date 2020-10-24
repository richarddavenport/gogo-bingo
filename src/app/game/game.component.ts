import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { Game } from "../game.model";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"]
})
export class GameComponent implements OnInit {
  doc$: Observable<Game>;

  constructor(private route: ActivatedRoute, private afs: AngularFirestore) {}

  ngOnInit() {
    this.doc$ = this.route.params.pipe(
      tap(params => {
        console.log(params["id"]);
      }),
      switchMap(params => {
        return this.afs.doc<Game>(`games/${params["id"]}`).valueChanges();
      })
    );
  }
}
