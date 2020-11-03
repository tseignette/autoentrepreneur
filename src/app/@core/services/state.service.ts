import { EventEmitter, Injectable } from '@angular/core';
import { DEFAULT_STATE } from '../core.constants';

export interface State {
  dailyRate: number;
  socialChargesRate: number;
}

@Injectable()
export class StateService {

  stateChanges$ = new EventEmitter<{
    key: keyof State,
    value: any
  }>();

  constructor() { }

  get(key: keyof State): number {
    const localeStorageItem = localStorage.getItem(key);

    if (localeStorageItem === null) {
      return DEFAULT_STATE[key];
    }

    return Number(localeStorageItem);
  }

  set(key: keyof State, value: number): void {
    localStorage.setItem(key, String(value));
    this.stateChanges$.next({ key, value });
  }

}
