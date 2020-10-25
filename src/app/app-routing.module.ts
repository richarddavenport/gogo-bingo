import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WelcomeComponent } from "./welcome/welcome.component";

const routes: Routes = [
  {
    path: "",
    component: WelcomeComponent
  },
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
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
