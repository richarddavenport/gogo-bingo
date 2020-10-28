import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameType } from 'src/app/GameType';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input() gameType: GameType;
  @Input() playing: number[] = [];
  @Input() spaces: number[] = [];
  @Input() selectedSpaces: number[] = [];
  @Input() disabled = false;
  @Input() cardId: string;
  @Input() hideLegend = false;
  @Input() hideCardId = false;

  @Output() selected = new EventEmitter<number>();

  GameType = GameType;

  // prettier-ignore
  indexes = [
    0,5,10,15,20,
    1,6,11,16,21,
    2,7,12,17,22,
    3,8,13,18,23,
    4,9,14,19,24
  ];
}
