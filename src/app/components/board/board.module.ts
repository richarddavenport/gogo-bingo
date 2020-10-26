import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BoardComponent } from "./board.component";
import { MaterialModule } from "../../material.module";
import { SpaceComponent } from './space/space.component';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [BoardComponent, SpaceComponent],
  exports: [BoardComponent]
})
export class BoardModule {}
