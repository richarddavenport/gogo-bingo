import { GameType } from "./GameType";

export interface Game {
  spaces: number[];
  gameType: GameType;
  createdAt: firebase.firestore.Timestamp;
  cards: any[];
}
