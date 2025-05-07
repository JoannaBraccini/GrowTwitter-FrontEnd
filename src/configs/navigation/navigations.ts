import { Navigation } from "./types";

export const navigations: Navigation[] = [
  { title: "Feed", to: "/feed" }, // /busca p/ get de tweets -> like,retweet,modal tweet/reply
  { title: "Login", to: "/sign" }, //e signup
  { title: "Profile", to: "/:username" }, // /id p/ get de users -> follow,like,retweet,modal tweet/reply
  { title: "Explore", to: "/explore" }, //get por tweet content??
];
