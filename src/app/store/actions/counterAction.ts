import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../';
//import { ILogin } from '../models';

@Injectable()
export class CounterAction {

    static INCREMENT: string = 'INCREMENT';
    static DECREMENT: string = 'DECREMENT';
    static INCREMENTSUCCESS: string = 'INCREMENTSUCCESS';
    static DECREMENTSUCCESS: string = 'DECREMENTSUCCESS';
    static USERSIGNIN: string = 'USERSIGNIN';
    static USERSIGNINSUCCESS: string = 'USERSIGNINSUCCESS';
    static USERLOGOUT: string = 'USERLOGOUT';
    static USERLOGOUTSUCCESS: string = 'USERLOGOUTSUCCESS';
    static UPDATEUSERSETTINGS: string = 'UPDATEUSERSETTINGS';
    static UPDATEUSERSETTINGSSUCCESS: string = 'UPDATEUSERSETTINGSSUCCESS';

    constructor(private ngRedux: NgRedux<IAppState>) {
    }

    increment(val): void {
        this.ngRedux.dispatch({ type: CounterAction.INCREMENT, payload: val });
    }

    decrement(val): void {
        this.ngRedux.dispatch({ type: CounterAction.DECREMENT, payload: val });
    }

    userSignIn(userObj): void {
        this.ngRedux.dispatch({ type: CounterAction.USERSIGNIN, payload: userObj });
    }

    logoutUser() {
        this.ngRedux.dispatch({ type: CounterAction.USERLOGOUT });
    }

    updateUserSettings(f) {
        this.ngRedux.dispatch({ type: CounterAction.UPDATEUSERSETTINGS,payload:f });
    }


}
