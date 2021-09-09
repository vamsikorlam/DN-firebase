import { Injectable } from "@angular/core";
import { LocalStorageRefService } from "./local-storage-ref.service";
import { StorageItem } from "./local-storage.utils";
import { BehaviorSubject, Subject } from "rxjs";



@Injectable({ providedIn: "root" })
export class LocalStorageService {

  _myData$ = new BehaviorSubject<any>(null);
  // myData$ = this._myData$.asObservable();

  constructor(private localStorageRefService: LocalStorageRefService) {
    this.localStorage = localStorageRefService.localStorage;
  }
  private localStorage: Storage;

  private static reverseArr(input): any[] {
    if (!input)
      return [];
    const ret = [];
    for (let i = input.length - 1; i >= 0; i--) {
      ret.push(input[i]);
    }
    return ret;
  }
  private static checkValue(value, arr): boolean {
    let status = false;
    for (const name of arr) {
      if (name instanceof Object) {
        if (JSON.stringify(name) === JSON.stringify(value)) {
          status = true;
          break;
        }
      } else {
        if (name === value) {
          status = true;
          break;
        }
      }
    }
    return status;
  }

  setInfo(key: StorageItem, data: any): void {
    const jsonData = JSON.stringify(data);
    this.localStorage.setItem(key, jsonData);
    this._myData$.next({ key, data });
  }

  loadInfo(key: StorageItem): any {
    const data = JSON.parse(this.localStorage.getItem(key));
    // this._myData$.next({ key, data });
    return data;
  }

  clearInfo(key: StorageItem): void {
    this.localStorage.removeItem(key);
    this._myData$.next({ key, data: null });
  }

  clearAllLocalStorage(): void {
    this.localStorage.clear();
    this._myData$.next(null);
  }

  setSearchHistory(key, searchItem: any): void {
    if (!key || !searchItem)
      console.log('Missing required parameters..')
    const response = this.loadInfo(key);
    let history = response ? JSON.parse(response) : '';
    if (!history || history.length === 0) {
      history = [];
    }
    if (history.length > 4)
      history.splice(0, 1);
    if (!LocalStorageService.checkValue(searchItem, history))
      history.push(searchItem)
    this.setInfo(key, JSON.stringify(history));
  }

  getSearchHistory(key): any[] {
    const response = this.loadInfo(key);
    const data = JSON.parse(response);
    return LocalStorageService.reverseArr(data);
  }

  clearSearchHistory(key): void {
    this.clearInfo(key);
  }
}
