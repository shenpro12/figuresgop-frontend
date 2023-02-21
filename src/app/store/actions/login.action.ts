import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '@login/login',
  props<{
    status: boolean;
    userProfile: any;
  }>()
);
export const logOut = createAction('@login/logout');
export const updateProfile = createAction(
  '@login/updateProfile',
  props<{
    profile: { name: string; phone: string; location: string };
  }>()
);
