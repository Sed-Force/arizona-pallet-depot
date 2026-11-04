"use client";

import { useEffect, useRef } from "react";

/**
 * Press-and-hold for stepper buttons: fires once on press, then repeats every `interval` ms
 * once the button has been held for `delay` ms. Spread the returned props onto a <button>.
 * Keyboard presses (Enter/Space) still step once per press.
 */
export function useHoldRepeat(action: () => void, { delay = 500, interval = 75 } = {}) {
  // Always call the latest action, so a hold keeps stepping from the current value.
  const actionRef = useRef(action);
  useEffect(() => {
    actionRef.current = action;
  });

  const timers = useRef<{ timeout?: number; repeat?: number }>({});
  const stop = () => {
    window.clearTimeout(timers.current.timeout);
    window.clearInterval(timers.current.repeat);
    timers.current = {};
  };
  useEffect(() => stop, []);

  return {
    onPointerDown: (e: React.PointerEvent<HTMLButtonElement>) => {
      if (e.button !== 0) return;
      stop();
      actionRef.current();
      timers.current.timeout = window.setTimeout(() => {
        timers.current.repeat = window.setInterval(() => actionRef.current(), interval);
      }, delay);
      // A button that disables itself mid-hold (e.g. reaching the minimum) stops getting pointer events.
      window.addEventListener("pointerup", stop, { once: true });
    },
    onPointerUp: stop,
    onPointerLeave: stop,
    onPointerCancel: stop,
    // Pointer presses already stepped on pointerdown; detail 0 means the click came from the keyboard.
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
      if (e.detail === 0) actionRef.current();
    },
    // Keep a long touch from opening the context menu or selecting text.
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
  };
}
