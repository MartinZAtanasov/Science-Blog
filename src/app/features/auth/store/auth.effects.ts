import { UserModel } from './../models/user.model';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as fromAuthActions from './auth.actions';
import { of } from 'rxjs';

const fireBaseApiKey = 'AIzaSyBAQmCH4nf6pW7wPPSmBGQg7MP991CIekw';
interface AuthSuccesResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

   @Effect()
  startAuthentication = this.actions$.pipe(
    ofType(fromAuthActions.START_AUTH),
    exhaustMap( (action: fromAuthActions.StartAuth) => this.startAuth(action) )
   );

   @Effect()
   autoLogin = this.actions$.pipe(
    ofType(fromAuthActions.AUTO_LOGIN),
    exhaustMap( (action: fromAuthActions.AutoLogin) =>  {
        const storageUser = JSON.parse(localStorage.getItem('user'));
        if (storageUser && new Date(storageUser.tokenExpiresOnDate) > new Date()) {
            const user = new UserModel(
                storageUser.email,
                storageUser.userId,
                storageUser.token,
                new Date(storageUser.tokenExpiresOnDate)
            );
            return of(new fromAuthActions.SuccessAuth(user));
        }
        return of();
    })
   );

   @Effect({dispatch: false})
   autoLogout = this.actions$.pipe(
       ofType(fromAuthActions.LOG_OUT),
       tap(() => localStorage.removeItem('user'))
   );

    // Support function to handle authentication success
    startAuth(action: fromAuthActions.StartAuth) {
        const firebasePostUrl = action.payload.login ?
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' :
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
        return this.http.post(
            firebasePostUrl + fireBaseApiKey,
            {email: action.payload.email, password: action.payload.password, returnSecureToken: true}
        ).pipe(
            map( (res: AuthSuccesResponse) =>  {
                const tokenExpiresOnDate = new Date( new Date().getTime() + +res.expiresIn * 1000 );
                const user = new UserModel(res.email, res.localId, res.idToken, tokenExpiresOnDate);
                localStorage.setItem('user', JSON.stringify(user));
                return new fromAuthActions.SuccessAuth(user);
            }),
            catchError(err => of( new fromAuthActions.AuthError('Something Went Wrong') ))
        );
    }
}

