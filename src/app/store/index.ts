import { NgModule } from '@angular/core';
import { NgRedux, DevToolsExtension } from 'ng2-redux';
import { createEpicMiddleware } from 'redux-observable';
import { combineReducers } from 'redux';

// Reducers
import { counterReducer } from './reducers';

// Actions
import { CounterAction } from './actions';
export {CounterAction} from './actions';

import { CounterEpics } from './epics';
import { ICounter } from './ICounter';
import { IUserData } from './userObj';


//export { Observable } from 'rxjs';
//export { select, NgRedux } from 'ng2-redux';
//export { bindActionCreators } from 'redux';

export interface IAppState {
  counter?: ICounter;
  isLoggedIn? : boolean;
  isSignUp? : boolean;
  userEmail?: string;
  userData? : IUserData;
}

export const AppReducer = combineReducers<IAppState>({
  counter: counterReducer,
  isLoggedIn : counterReducer
});


@NgModule({
  providers: [
    // actions
     CounterAction,
    // epics
    CounterEpics
    // other services
    //, HttpService
  ]
})
export class StoreModule {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension,
    private counterEpics: CounterEpics
    // More Epics here
    
  ) {
    const middleware = [
      createEpicMiddleware(this.counterEpics.increment),
      createEpicMiddleware(this.counterEpics.getUserData),
      createEpicMiddleware(this.counterEpics.decrement),
      createEpicMiddleware(this.counterEpics.userSignIn),
      createEpicMiddleware(this.counterEpics.userLogout),
      createEpicMiddleware(this.counterEpics.updateUserSettings),
      createEpicMiddleware(this.counterEpics.postJob),
      createEpicMiddleware(this.counterEpics.signupCompany),
      createEpicMiddleware(this.counterEpics.signupStudent),
      createEpicMiddleware(this.counterEpics.applyForJob)

      // More middleware here
    ];
    this.ngRedux.configureStore(
      AppReducer,                                         // Main Reducer
      {},                                                 // Defailt State
      middleware,                                         // Middlewares
      [devTool.isEnabled() ? devTool.enhancer() : f => f] // Enhancers
    )
  }
} 