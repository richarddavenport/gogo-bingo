import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GameRoutingModule } from "./game-routing.module";
import { GameComponent } from "./game.component";
import { CardComponent } from './card/card.component';
import { JoinGameComponent } from './join-game/join-game.component';

@NgModule({
  imports: [CommonModule, GameRoutingModule],
  declarations: [GameComponent, CardComponent, JoinGameComponent]
})
export class GameModule {}
