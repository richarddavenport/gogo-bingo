import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { CardComponent } from './card/card.component';
import { JoinGameComponent } from './join-game/join-game.component';
import { MaterialModule } from '../material.module';
import { BoardModule } from '../components/board/board.module';
import { CallerComponent } from './caller/caller.component';

@NgModule({
  imports: [CommonModule, GameRoutingModule, MaterialModule, BoardModule],
  declarations: [GameComponent, CardComponent, JoinGameComponent, CallerComponent],
})
export class GameModule {}
