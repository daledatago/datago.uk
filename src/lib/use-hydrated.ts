import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** False on the server and during hydration, true afterwards. */
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

/** True when the page is showing the dark theme. */
export function useDarkTheme() {
  return useSyncExternalStore(
    subscribeTheme,
    () => document.documentElement.getAttribute("data-theme") === "dark",
    () => false,
  );
}
