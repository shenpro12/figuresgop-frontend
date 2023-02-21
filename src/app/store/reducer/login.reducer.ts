import { createReducer, on } from '@ngrx/store';
import { login, logOut, updateProfile } from '../actions/login.action';

export interface LoginState {
  status: boolean;
  userProfile: any;
}
const initialState: LoginState = { status: false, userProfile: '' };

export const loginReducer = createReducer(
  initialState,
  on(login, (state, { status, userProfile }) => {
    return {
      status: status,
      userProfile: userProfile,
    };
  }),
  on(logOut, () => {
    return {
      status: false,
      userProfile: '',
    };
  }),
  on(updateProfile, (state, { profile }) => {
    return {
      status: state.status,
      userProfile: {
        ...state.userProfile,
        name: profile.name,
        phone: profile.phone,
        location: profile.location,
      },
    };
  })
);
