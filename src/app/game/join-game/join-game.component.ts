import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { ActivatedRoute } from "@angular/router";
import { firestore } from "firebase";
import { switchMap, take } from "rxjs/operators";
import { Game } from "../../game.model";

@Component({
  selector: "app-join-game",
  templateUrl: "./join-game.component.html",
  styleUrls: ["./join-game.component.css"]
})
export class JoinGameComponent implements OnInit {
  constructor(private afs: AngularFirestore, private route: ActivatedRoute) {}

  ngOnInit() {}

  onJoinGame() {
    const cardId = uuid(6);
    const key = `cards.${cardId}`;
    const update = {
      [key]: "foo"
    };

    this.route.parent.params
      .pipe(
        switchMap(params =>
          this.afs.doc<Game>(`games/${params["id"]}`).update(update)
        ),
        take(1)
      )
      .subscribe();
  }
}

function uuid(length) {
  return [...Array(length)]
    .map(() => Math.floor(Math.random() * 36).toString(36))
    .join("");
}
