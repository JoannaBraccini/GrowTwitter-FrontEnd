import { combineReducers } from "@reduxjs/toolkit";
import { alertReducer } from "./alert/alertSlice";
import { signupReducer } from "./auth/signupSlice";
import { userLoggedReducer } from "./auth/loginSlice";
import { settingsReduce } from "./settings/settingsSlice";
import { usersReducer } from "./users/usersSlice";
import { userDetailsReducer } from "./users/userDetailsSlice";
import { tweetsReducer } from "./tweets/tweetsSlice";
import { tweetDetailsReducer } from "./tweets/tweetDetailsSlice";
import { trendsReducer } from "./trends/trendsSlice";

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
});
