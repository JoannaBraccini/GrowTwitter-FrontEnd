import { alertReducer } from "./alert/alertSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { notificationsReducer } from "./notifications/notificationsSlice";
import { settingsReduce } from "./settings/settingsSlice";
import { signupReducer } from "./auth/signupSlice";
import { trendsReducer } from "./trends/trendsSlice";
import { tweetDetailsReducer } from "./tweets/tweetDetailsSlice";
import { tweetsReducer } from "./tweets/tweetsSlice";
import { userDetailsReducer } from "./users/userDetailsSlice";
import { userLoggedReducer } from "./auth/loginSlice";
import { usersReducer } from "./users/usersSlice";

export const rootReducer = combineReducers({
  alert: alertReducer,
  settings: settingsReduce,
  userSignup: signupReducer,
  userLogged: userLoggedReducer,
  usersList: usersReducer,
  tweetsList: tweetsReducer,
  userDetail: userDetailsReducer,
  tweetDetail: tweetDetailsReducer,
  trends: trendsReducer,
  notifications: notificationsReducer,
});
