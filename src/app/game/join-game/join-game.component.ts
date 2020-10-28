import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import chance from 'chance';
import { of } from 'rxjs';
import { catchError, finalize, switchMap, take } from 'rxjs/operators';
import { LoadingBarService } from '../../components/loader/loading-bar.service';
import { Game } from '../../game.model';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss'],
})
export class JoinGameComponent implements OnInit {
  name: string;
  joining: boolean = false;
  loader = this.loadingBar.useRef();

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    private loadingBar: LoadingBarService,
  ) {}

  ngOnInit() {}

  onJoinGame() {
    this.loader.start();
    this.joining = true;
    const cardId = uuid(6);
    const spacesKey = `cards.${cardId}.spaces`;
    const selectedSpacesKey = `cards.${cardId}.selectedSpaces`;
    const nameKey = `cards.${cardId}.name`;
    const update = {
      [spacesKey]: newCard(),
      [selectedSpacesKey]: [],
      [nameKey]: this.name,
    };

    this.route.parent.params
      .pipe(
        switchMap((params) => this.afs.doc<Game>(`games/${params['id']}`).update(update)),
        take(1),
        catchError(() => {
          this.joining = false;
          return of(this.loader.stop());
        }),
        finalize(() => {
          this.joining = false;
          this.loader.stop();
          this.router.navigate([cardId], { relativeTo: this.route.parent });
        }),
      )
      .subscribe();
  }
}

function uuid(length: number) {
  return [...Array(length)].map(() => Math.floor(Math.random() * 36).toString(36)).join('');
}

function newCard(): number[] {
  return [
    ...chance().unique(chance().integer, 5, { min: 1, max: 15 }),
    ...chance().unique(chance().integer, 5, { min: 16, max: 30 }),
    ...chance().unique(chance().integer, 5, { min: 31, max: 45 }),
    ...chance().unique(chance().integer, 5, { min: 46, max: 60 }),
    ...chance().unique(chance().integer, 5, { min: 61, max: 75 }),
  ];
}
