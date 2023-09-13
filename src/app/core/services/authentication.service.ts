import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ICredential, IUserData } from 'src/app/shared/Interface/IUserData';
import { CacheData } from 'src/app/shared/classes/cacheData';
import {
  CURRENT_USER_KEY,
  USER_LIST_KEY,
} from 'src/app/shared/classes/cacheKeys';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  currentUserData: IUserData | undefined = CacheData.fetch(CURRENT_USER_KEY);

  constructor(private route: Router) {}
  loginUser(data: ICredential) {
    const userData = this.findUser(data);
    if (userData) {
      CacheData.store(CURRENT_USER_KEY, userData);
      this.currentUserData = CacheData.fetch(CURRENT_USER_KEY);
      this.routeToUserList();
    }
  }

  routeToUserList() {
    this.route.navigateByUrl('/user-list');
  }

  findUser(data: ICredential): IUserData | undefined {
    let userPresent = false;
    const userData: IUserData = { ...data, isUserAdmin: false };
    const userList: IUserData[] = CacheData.fetch(USER_LIST_KEY);
    for (let user of userList) {
      if (user.password === data.password && user.userName === data.userName) {
        userData.isUserAdmin = user.isUserAdmin;
        userPresent = true;
        break;
      }
    }
    return userPresent ? userData : undefined;
  }

  logoutUser() {
    CacheData.deleteKey(CURRENT_USER_KEY);
    this.route.navigateByUrl('');
    setTimeout(() => {
      location.reload();
    }, 100);
  }
}
