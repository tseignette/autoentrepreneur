import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PriceService, StateService } from 'src/app/@core/services';

class BarItem {

  tooltip: string;

  percentage: number;

  constructor(public value: number, total: number, name: string) {
    this.percentage = 100 * value / total;
    this.tooltip = `${name} - ${this.percentage.toFixed(1)}%`;
  }

}

@Component({
  selector: 'app-charges-bar',
  templateUrl: './charges-bar.component.html',
  styleUrls: ['./charges-bar.component.scss']
})
export class ChargesBarComponent implements OnChanges, OnInit, OnDestroy {

  @Input() computeIncomeTax = false;

  @Input() disabled: boolean;

  @Input() total: number;

  class = ['bg-primary text-light', 'bg-secondary text-dark', 'bg-gray text-dark'];

  items: BarItem[] = [];

  private stateChangesSub: Subscription;

  constructor(
    private priceService: PriceService,
    private stateService: StateService
  ) { }

  ngOnChanges(): void {
    if (this.disabled) {
      this.items = [];
    }
    else {
      this.updateItems();
    }
  }

  ngOnInit(): void {
    this.stateChangesSub = this.stateService.stateChanges$
      .pipe(
        filter($event => $event.key === 'socialChargesRate')
      )
      .subscribe(() => {
        this.updateItems();
      });
  }

  ngOnDestroy(): void {
    if (this.stateChangesSub) {
      this.stateChangesSub.unsubscribe();
    }
  }

  private updateItems(): void {
    const socialCharges = this.priceService.computeSocialCharges(this.total);
    let income = this.total - socialCharges;

    this.items = [new BarItem(socialCharges, this.total, 'Charges sociales')];

    if (this.computeIncomeTax) {
      const incomeTax = this.priceService.computeIncomeTax(this.total);

      income -= incomeTax;
      this.items.push(new BarItem(incomeTax, this.total, 'Impôt sur le revenu'));
    }

    this.items.unshift(new BarItem(income, this.total, 'Revenus'));
  }

}
