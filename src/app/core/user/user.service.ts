import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { User } from './user';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class UserService {
  private user: User;

  private userSource: Subject<User> = new Subject<User>();
  public userSource$: Observable<User> = this.userSource.asObservable();

  constructor(private af: AngularFire) {
    this.af.auth.subscribe((auth: any) => {
      if (auth) {
        this.user = new User(
          auth.auth.uid,
          auth.auth.displayName,
          auth.auth.email,
          auth.auth.photoURL
        );
        this.registerUser(this.user);
      } else {
        this.user = null;
      }
      this.userSource.next(this.user);
    });
  }

  login() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }

  private registerUser(user: User) {
    this.af.database.object(`users/${user.id}`).subscribe((data) => {
      if (!data.$exists()) {
        this.af.database.object(`users/${user.id}`).set({
          name: user.name,
          email: user.email,
          avatar: user.avatar
        });
      }
    })
  }

  public getUser(): User {
    return this.user;
  }
}
