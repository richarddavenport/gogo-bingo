import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BoardComponent } from "./board.component";
import { MaterialModule } from "../../material.module";

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [BoardComponent],
  exports: [BoardComponent]
})
export class BoardModule {}
