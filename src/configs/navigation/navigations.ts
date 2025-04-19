import { Navigation } from "./types";

export const navigations: Navigation[] = [
  { title: "Feed", to: "/" }, // /busca p/ get de tweets -> like,retweet,modal tweet/reply
  { title: "Login", to: "/sign" }, //e signup
  { title: "Profile", to: "/profile" }, // /id p/ get de users -> follow,like,retweet,modal tweet/reply
  { title: "Explore", to: "/explore" }, //get por tweet content??
];
