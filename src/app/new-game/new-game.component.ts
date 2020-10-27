import { Component, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatRadioChange, MatRadioGroup } from '@angular/material/radio';
import { Router } from '@angular/router';
import { firestore } from 'firebase/app';
import { AVAILABLE_NUMBERS } from '../Card';
import { LoadingBarService } from '../components/loader/loading-bar.service';
import { Game } from '../game.model';
import { GameType } from '../GameType';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss'],
})
export class NewGameComponent {
  public GameType = GameType;
  public selectedSpaces = [];
  public gameTypes: GameType[] = [GameType.Normal, GameType.Horizontals, GameType.Verticals, GameType.Diagonals];

  @ViewChild(MatRadioGroup) gameTypePicker: MatRadioGroup;
  loader = this.loadingBar.useRef();

  constructor(private afs: AngularFirestore, private loadingBar: LoadingBarService, private router: Router) {}

  onGameChange(_: MatRadioChange): void {
    this.selectedSpaces = [];
  }

  onSelectSpace(index: number): void {
    this.gameTypePicker.selected = null;
    const indexOf = this.selectedSpaces.indexOf(index);
    if (indexOf === -1) {
      this.selectedSpaces.push(index);
    } else {
      this.selectedSpaces.splice(indexOf, 1);
    }
  }

  async onStart(): Promise<void> {
    const docRef = await this.afs
      .collection(`games`)
      .add({
        gameType: !this.selectedSpaces.length ? this.gameTypePicker.selected.value : GameType.Custom,
        spaces: this.selectedSpaces,
        cards: {},
        createdAt: firestore.Timestamp.now(),
        availableNumbers: shuffle(AVAILABLE_NUMBERS),
        calledNumbers: [],
      } as Game)
      .catch((error) => {
        this.loader.stop();
        console.error(error);
      });
    this.loader.stop();
    if (docRef) this.router.navigate(['game', docRef.id, 'caller']);
  }
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
