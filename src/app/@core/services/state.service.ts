import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Subject } from 'rxjs';
import { DEFAULT_STATE } from '../core.constants';

export interface State {
  dailyRate: number;
  socialChargesRate: number;
  turnoverGoal: number;
  turnoverRealized: number;
}

@Injectable()
export class StateService {

  stateChanges$ = new Subject<{
    key: keyof State,
    value: any
  }>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: string
  ) { }

  get(key: keyof State): number {
    let localeStorageItem = null;

    if (isPlatformBrowser(this.platformId)) {
      localeStorageItem = localStorage.getItem(key);
    }

    if (localeStorageItem === null) {
      return DEFAULT_STATE[key];
    }

    return Number(localeStorageItem);
  }

  set(key: keyof State, value: number): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, String(value));
    }

    this.stateChanges$.next({ key, value });
  }

}
