export class CacheData {
  static store(uniqueKey: string, value: any) {
    const key = uniqueKey;
    localStorage.setItem(key, JSON.stringify(value));
    return key;
  }

  static fetch(key: string): any {
    const cachedObj = localStorage.getItem(key);
    if (cachedObj) {
      return JSON.parse(cachedObj);
    }
    return null;
  }

  static deleteKey(key: string): void {
    localStorage.removeItem(key);
  }
}
