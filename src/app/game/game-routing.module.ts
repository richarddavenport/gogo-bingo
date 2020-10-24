import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CardComponent } from "./card/card.component";
import { GameComponent } from "./game.component";
import { JoinGameComponent } from "./join-game/join-game.component";

const routes: Routes = [
  {
    path: ":id",
    component: GameComponent,
    children: [
      {
        path: "join",
        component: JoinGameComponent
      },
      {
        path: ":card",
        component: CardComponent
      },
      {
        path: "**",
        redirectTo: "join"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule {}
