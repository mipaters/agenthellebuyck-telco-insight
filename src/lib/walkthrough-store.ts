import { useSyncExternalStore } from "react";

type State = { open: boolean; step: number };

let state: State = { open: false, step: 0 };
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

export function setWalkthrough(next: Partial<State>) {
  state = { ...state, ...next };
  emit();
}

export function openWalkthrough() {
  setWalkthrough({ open: true, step: 0 });
}

export function closeWalkthrough() {
  setWalkthrough({ open: false, step: 0 });
}

export function useWalkthrough() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => state,
    () => state,
  );
}
