import { Injectable } from '@angular/core';
import { DEFAULT_STATE } from '../core.constants';

export interface State {
  socialCharges: number;
}

@Injectable()
export class StateService {

  constructor() { }

  get(key: keyof State): number {
    const localeStorageItem = localStorage.getItem(key);

    if (localeStorageItem === null) {
      return DEFAULT_STATE[key];
    }

    return parseFloat(localeStorageItem);
  }

  set(key: keyof State, value: number): void {
    localStorage.setItem(key, String(value));
  }

}
