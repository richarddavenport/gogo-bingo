import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { ActivatedRoute, Router } from "@angular/router";
import { firestore } from "firebase";
import { catchError, finalize, switchMap, take, tap } from "rxjs/operators";
import { LoadingBarService } from "../../components/loader/loading-bar.service";
import { Game } from "../../game.model";
import chance from "chance";
import { Card } from "../../Card";
import { of } from "rxjs";

@Component({
  selector: "app-join-game",
  templateUrl: "./join-game.component.html",
  styleUrls: ["./join-game.component.css"]
})
export class JoinGameComponent implements OnInit {
  joining: boolean = false;
  loader = this.loadingBar.useRef();

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    private loadingBar: LoadingBarService
  ) {}

  ngOnInit() {}

  onJoinGame() {
    this.loader.start();
    this.joining = true;
    const cardId = uuid(6);
    const key = `cards.${cardId}.card`;
    const update = {
      [key]: newCard()
    };

    this.route.parent.params
      .pipe(
        switchMap(params =>
          this.afs.doc<Game>(`games/${params["id"]}`).update(update)
        ),
        take(1),
        catchError(() => {
          this.joining = false;
          return of(this.loader.stop());
        }),
        finalize(() => {
          this.joining = false;
          this.loader.stop();
          this.router.navigate([cardId], { relativeTo: this.route.parent });
        })
      )
      .subscribe();
  }
}

function uuid(length) {
  return [...Array(length)]
    .map(() => Math.floor(Math.random() * 36).toString(36))
    .join("");
}

function newCard(): Card {
  return [
    ...chance().unique(chance().integer, 5, { min: 1, max: 15 }),
    ...chance().unique(chance().integer, 5, { min: 16, max: 30 }),
    ...chance().unique(chance().integer, 5, { min: 31, max: 45 }),
    ...chance().unique(chance().integer, 5, { min: 46, max: 60 }),
    ...chance().unique(chance().integer, 5, { min: 61, max: 75 })
  ];
}
