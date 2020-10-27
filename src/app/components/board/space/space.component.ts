import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceComponent {
  @Input() playing: number[] = [];
  @Input() spaces: number[] = [];
  @Input() selectedSpaces: number[] = [];
  @Input() index: number = 0;
  @Input() disabled = false;

  @Output() selected = new EventEmitter<number>();
}
