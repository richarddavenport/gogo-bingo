import { Component, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatRadioChange, MatRadioGroup } from '@angular/material/radio';
import { firestore } from 'firebase/app';
import { LoadingBarService } from '../components/loader/loading-bar.service';
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

  constructor(private afs: AngularFirestore, private loadingBar: LoadingBarService) {}

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
      })
      .catch((error) => {
        this.loader.stop();
        console.error(error);
      });
    this.loader.stop();
    console.log(docRef);
  }
}
