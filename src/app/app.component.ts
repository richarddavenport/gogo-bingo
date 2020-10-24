import { Component } from '@angular/core';
import * as chance from 'chance';

type Card = number[][];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  cards: Card[] = [];
  loaderColor = 'white';

  onClick(): void {
    for (let index = 0; index < 100000; index++) {
      this.cards = [...this.cards, this.newCard()];
      const dupe = this.checkForDuplicates();
      if (dupe) {
        console.log('dupe found');
      }
    }
  }

  newCard(): Card {
    return [
      chance().unique(chance().integer, 5, { min: 1, max: 15 }),
      chance().unique(chance().integer, 5, { min: 16, max: 30 }),
      chance().unique(chance().integer, 5, { min: 31, max: 45 }),
      chance().unique(chance().integer, 5, { min: 46, max: 60 }),
      chance().unique(chance().integer, 5, { min: 61, max: 75 }),
    ];
  }

  checkForDuplicates(): boolean {
    const valuesAlreadySeen = [];

    for (const card of this.cards) {
      const id = this.concat(card);
      if (valuesAlreadySeen.indexOf(id) !== -1) {
        return true;
      }
      valuesAlreadySeen.push(id);
    }
    return false;
  }

  concat(card): string {
    return (
      `${card[0][0]}${card[0][1]}${card[0][2]}${card[0][3]}${card[0][4]}` +
      `${card[1][0]}${card[1][1]}${card[1][2]}${card[1][3]}${card[1][4]}` +
      `${card[2][0]}${card[2][1]}${card[2][2]}${card[2][3]}${card[2][4]}` +
      `${card[3][0]}${card[3][1]}${card[3][2]}${card[3][3]}${card[3][4]}` +
      `${card[4][0]}${card[4][1]}${card[4][2]}${card[4][3]}${card[4][4]}`
    );
  }

  onChangeTheme(theme: string): void {
    console.log('AppComponent -> onChangeTheme -> theme', theme);
  }
}
