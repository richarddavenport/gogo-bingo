import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { ActivatedRoute } from "@angular/router";
import { firestore } from "firebase";
import { Observable } from "rxjs";
import { map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { Game } from "../../game.model";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent implements OnInit {
  public selectedSpaces = [];
  card$: Observable<any>;
  gameId: string;
  cardId: string;
 
  constructor(private route: ActivatedRoute, private afs: AngularFirestore) {}

  ngOnInit() {
    this.card$ = this.route.parent.params.pipe(
      map(params => params["id"]),
      tap(gameId => this.gameId = gameId),
      switchMap(gameId => this.afs.doc<Game>(`games/${gameId}`).valueChanges()),
      switchMap(gameDoc => this.route.params.pipe(
        map(params => params["card"]),
        tap(cardId => this.cardId = cardId),
        map(cardId => gameDoc?.cards[cardId].card))
      ),
    );
  }

  onSelectSpace(index: number): void {
    const indexOf = this.selectedSpaces.indexOf(index);
    const key = `cards.${this.cardId}.selectedSpaces`;
    let update;
    if (indexOf === -1) {
      this.selectedSpaces.push(index);
      update = { [key]: firestore.FieldValue.arrayUnion(index)};
    } else {
      this.selectedSpaces.splice(indexOf, 1);
      update = { [key]: firestore.FieldValue.arrayRemove(index)};
    }
    this.afs.doc(`games/${this.gameId}`).update(update);
  }
}
