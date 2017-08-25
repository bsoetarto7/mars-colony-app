import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageTest {

  constructor() {}

  available() {
    const modtest = 'test';
    try {
        window.localStorage.setItem(modtest, modtest);
        window.localStorage.removeItem(modtest);
        return true;
    } catch(e) {
        return false;
    }
  }
}