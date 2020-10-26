import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { firestore } from 'firebase/app';
import { Observable, zip } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Game } from '../../game.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  cardId$: Observable<string>;
  gameDoc: AngularFirestoreDocument<Game>;
  game$: Observable<Game>;

  constructor(private route: ActivatedRoute, private afs: AngularFirestore) {}

  ngOnInit() {
    this.cardId$ = this.route.params.pipe(map((params) => params['card']));
    this.game$ = this.route.parent.params.pipe(
      tap((params) => (this.gameDoc = this.afs.doc<Game>(`games/${params['id']}`))),
      map((params) => this.afs.doc<Game>(`games/${params['id']}`)),
      switchMap((gameDoc) => gameDoc.valueChanges()),
    );
  }

  onSelectSpace(index: number): any {
    zip(this.game$, this.cardId$)
      .pipe(take(1))
      .subscribe(([game, cardId]) => {
        const key = `cards.${cardId}.selectedSpaces`;
        let update: any;
        const indexOf = game.cards[cardId].selectedSpaces.indexOf(index);
        if (indexOf === -1) {
          update = { [key]: firestore.FieldValue.arrayUnion(index) };
        } else {
          update = { [key]: firestore.FieldValue.arrayRemove(index) };
        }
        return this.gameDoc.update(update);
      });
  }
}
