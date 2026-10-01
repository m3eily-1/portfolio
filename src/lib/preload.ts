"use client";

// The preloader runs once per full page load; anything that should start after it (the hero intro)
// waits here. Client-side navigations find it already done.
let done = false;
const waiting: (() => void)[] = [];

export const preloadDone = () => {
  done = true;
  waiting.splice(0).forEach((f) => f());
};

export const whenPreloaded = (f: () => void) => {
  if (done) f();
  else waiting.push(f);
};
