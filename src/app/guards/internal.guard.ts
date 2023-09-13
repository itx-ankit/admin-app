import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../core/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class InternalGuard {
  constructor(private auth: AuthenticationService, private route: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return new Observable((observer) => {
      const isLoggedIn: boolean = this.auth.currentUserData ? true : false;
      if (isLoggedIn) {
        observer.next(true);
      } else {
        this.route.navigateByUrl('');
      }
    });
  }
}
