import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "new-game",
    loadChildren: () =>
      import("./new-game/new-game.module").then(m => m.NewGameModule)
  },
  {
    path: "game",
    loadChildren: () => import("./game/game.module").then(m => m.GameModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
