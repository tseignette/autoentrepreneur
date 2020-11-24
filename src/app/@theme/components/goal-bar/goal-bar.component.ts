import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-goal-bar',
  templateUrl: './goal-bar.component.html',
  styleUrls: ['./goal-bar.component.scss']
})
export class GoalBarComponent implements OnChanges {

  @Input() turnoverGoal?: number;

  @Input() turnoverRealized?: number;

  percentage?: number;

  constructor() { }

  ngOnChanges(): void {
    if (
      this.turnoverGoal === null || this.turnoverGoal === undefined ||
      this.turnoverRealized === null || this.turnoverRealized === undefined ||
      this.turnoverGoal === 0
    ) {
      delete this.percentage;
    }
    else {
      const percentage = 100 * this.turnoverRealized / this.turnoverGoal;

      this.percentage = Number(percentage.toFixed(1));
    }
  }

}
