import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-called-numbers',
  templateUrl: './called-numbers.component.html',
  styleUrls: ['./called-numbers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalledNumbersComponent {
  called: string[];

  @Input() set calledNumbers(value: number[]) {
    this.called = value.map((num) => {
      if (this.between(num, 0, 15)) return `B${num}`;
      if (this.between(num, 16, 30)) return `I${num}`;
      if (this.between(num, 31, 45)) return `N${num}`;
      if (this.between(num, 46, 60)) return `G${num}`;
      if (this.between(num, 61, 75)) return `O${num}`;
    });
  }

  between(val: number, min: number, max: number): boolean {
    return min <= val && val <= max;
  }
}
