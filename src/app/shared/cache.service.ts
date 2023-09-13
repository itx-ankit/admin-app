import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  store(value: any, uniqueKey: string) {
    const key = uniqueKey;
    localStorage.setItem(key, JSON.stringify(value));
    return key;
  }

  fetch(key: string): any {
    const cachedObj = localStorage.getItem(key);
    if (cachedObj) {
      return JSON.parse(cachedObj);
    }
    return null;
  }

  deleteKey(key: string): void {
    localStorage.removeItem(key);
  }
}
