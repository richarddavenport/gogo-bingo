import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { firestore } from 'firebase/app';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Game } from 'src/app/game.model';

@Component({
  selector: 'app-caller',
  templateUrl: './caller.component.html',
  styleUrls: ['./caller.component.scss'],
})
export class CallerComponent implements OnInit {
  game$: Observable<Game>;
  gameDoc: AngularFirestoreDocument<Game>;
  origin: string;

  constructor(private route: ActivatedRoute, private afs: AngularFirestore) {}

  ngOnInit(): void {
    this.game$ = this.route.parent.params.pipe(
      tap((params) => (this.gameDoc = this.afs.doc<Game>(`games/${params['id']}`))),
      map((params) => this.afs.doc<Game>(`games/${params['id']}`)),
      switchMap((gameDoc) => gameDoc.valueChanges()),
    );
    this.origin = window.location.href.replace('caller', 'join');
  }

  onCall() {
    this.gameDoc
      .get()
      .pipe(take(1))
      .subscribe((gameDocSnap) => {
        const game = gameDocSnap.data() as Game;
        const called = _.sample(game.availableNumbers);
        this.gameDoc.update({
          availableNumbers: (firestore.FieldValue.arrayRemove(called) as unknown) as number[],
          calledNumbers: (firestore.FieldValue.arrayUnion(called) as unknown) as number[],
        });
      });
  }
}
