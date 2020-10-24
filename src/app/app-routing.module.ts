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
  },
  {
    path: "**",
    redirectTo: "game"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
