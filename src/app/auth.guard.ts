import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  canActivate(): Observable<boolean | UrlTree> {
    return new Observable((observer) => {
      const isLoggedIn: boolean = true;
      if (isLoggedIn) {
        observer.next(true);
      } else {
        observer.next(false);
      }
    });
  }
}
