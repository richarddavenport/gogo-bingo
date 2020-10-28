import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BoardModule } from '../components/board/board.module';
import { MaterialModule } from '../material.module';
import { CalledNumbersComponent } from './called-numbers/called-numbers.component';
import { CallerComponent } from './caller/caller.component';
import { CardComponent } from './card/card.component';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { JoinGameComponent } from './join-game/join-game.component';

@NgModule({
  imports: [CommonModule, FormsModule, GameRoutingModule, MaterialModule, BoardModule],
  declarations: [GameComponent, CardComponent, JoinGameComponent, CallerComponent, CalledNumbersComponent],
})
export class GameModule {}
