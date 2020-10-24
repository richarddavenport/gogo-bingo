import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CardComponent } from "./card/card.component";
import { GameComponent } from "./game.component";

const routes: Routes = [
  {
    path: ":id",
    component: GameComponent,
    children: [{ path: ":card", component: CardComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule {}
