import { Card } from './Card';
import { GameType } from './GameType';

export type Cards = Record<string, Card>;

export interface Game {
  spaces: number[];
  gameType: GameType;
  createdAt: firebase.firestore.Timestamp;
  cards: Cards;
  availableNumbers: number[];
  calledNumbers: number[];
}
