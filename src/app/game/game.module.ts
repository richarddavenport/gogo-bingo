import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GameRoutingModule } from "./game-routing.module";
import { GameComponent } from "./game.component";
import { CardComponent } from './card/card.component';

@NgModule({
  imports: [CommonModule, GameRoutingModule],
  declarations: [GameComponent, CardComponent]
})
export class GameModule {}
