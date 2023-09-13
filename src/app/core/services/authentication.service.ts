import { Injectable } from '@angular/core';
import { IUserData } from 'src/app/shared/Interface/IUserData';
import { CacheData } from 'src/app/shared/classes/cacheData';
import { CURRENT_USER_KEY } from 'src/app/shared/classes/cacheKeys';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  currentUserData: IUserData | undefined = CacheData.fetch(CURRENT_USER_KEY);

  loginUser(data: IUserData) {
    CacheData.store(CURRENT_USER_KEY, data);
  }

  logoutUser() {
    CacheData.deleteKey(CURRENT_USER_KEY);
    setTimeout(() => {
      window.open(location.href, '_self');
      // location.reload();
    }, 0);
  }
}
