import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

import { CounterAction } from '../actions/index';

@Injectable()
export class CounterEpics {

    constructor(public af: AngularFire) { }

    increment = (action$) =>
        action$.ofType(CounterAction.INCREMENT)
            .do((val) => {
                console.log("In Counter Epic - Increment: ", val);
            })
            .switchMap(({payload}) => {
                return Observable.of({
                    type: CounterAction.INCREMENTSUCCESS,
                    payload: payload + 1
                });
            });

    decrement = (action$) =>
        action$.ofType(CounterAction.DECREMENT)
            .do((val) => {
                console.log("In Counter Epic - Decrement : ", val);
            })
            .switchMap(({payload}) => {
                return Observable.of({
                    type: CounterAction.DECREMENTSUCCESS,
                    payload: payload - 1
                });
            });

    userSignIn = (action$) =>
        action$.ofType(CounterAction.USERSIGNIN)
            .do((val) => {
                console.log("UserData", val);
            })
            .switchMap(({payload}) => {
                return this.af.auth.login({
                    email: payload.email,
                    password: payload.password,
                },
                    {
                        provider: AuthProviders.Password,
                        method: AuthMethods.Password,
                    }).then(auth => {
                        console.log(auth);
                        return {
                            type: CounterAction.USERSIGNINSUCCESS,
                            payload: true
                        }
                    });
                //     return Observable.fromPromise(
                //     this.af.auth.login(result['user']['token'], { provider: AuthProviders.Custom, method: AuthMethods.CustomToken })
                //       .then(auth => {
                //         return {
                //           type: AuthActions.LOGIN_SUCCESS,
                //           payload: result['user']
                //         };
                //       })
                //   )
                // return Observable.of({
                //     type: CounterAction.USERSIGNINSUCCESS,
                //     payload : true
                // });
            });

    userLogout = (action$) =>
        action$.ofType(CounterAction.USERLOGOUT)
            .do((val) => {
                console.log("UserData", val);
            })
            .switchMap(({payload}) => {
                return this.af.auth.logout().then(auth => {
                    console.log(auth);
                    return {
                        type: CounterAction.USERLOGOUTSUCCESS
                    }
                });
            });

    updateUserSettings = (action$) =>
        action$.ofType(CounterAction.UPDATEUSERSETTINGS)
            .do((val) => {
                console.log("UserData", val);
            })
            .switchMap(({payload}) => {
                return this.af.database.object(`users/${payload.userID}`).set(payload)
                .then(auth => {
                    console.log(auth);
                    return {
                        type: CounterAction.UPDATEUSERSETTINGSSUCCESS
                    }
                }).catch(error=>{
                    console.log(error);
                    return {
                        type: CounterAction.UPDATEUSERSETTINGSSUCCESS
                    }
                });
            });
}