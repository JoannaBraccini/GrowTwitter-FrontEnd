import { Navigation } from "./types";

export const navigations: Navigation[] = [
  { title: "Login", to: "/" }, //e signup
  { title: "Feed", to: "/feed" }, // /busca p/ get de tweets -> like,retweet,modal tweet/reply
  { title: "Profile", to: "/profile" }, // /id p/ get de users -> follow,like,retweet,modal tweet/reply
  { title: "Explore", to: "/explore" }, //get por tweet content??
];
