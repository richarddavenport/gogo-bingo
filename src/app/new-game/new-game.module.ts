import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { NewGameRoutingModule } from './new-game-routing.module';
import { NewGameComponent } from './new-game.component';

@NgModule({
  declarations: [NewGameComponent],
  imports: [CommonModule, NewGameRoutingModule, MaterialModule],
})
export class NewGameModule {}
