"use client";

import { type ReactNode, useRef } from "react";
import { Flipped, spring } from "react-flip-toolkit";

export const FlippedItem = ({
  flipId,
  disabled,
  children,
}: {
  flipId: string | number;
  disabled?: boolean;
  children: ReactNode;
}) => {
  const isExitingRef = useRef(false);
  const appearSpringRef = useRef<ReturnType<typeof spring>>(null);

  return (
    <Flipped
      flipId={flipId}
      onAppear={(el) => {
        appearSpringRef.current = spring({
          onUpdate: (val) => {
            if (typeof val !== "number") {
              return;
            }
            el.style.opacity = `${1 * val}`;
            el.style.transform = `translateY(${-30 * (1 - val)}px)`;
          },
          onComplete: () => {
            appearSpringRef.current = null;
          },
        });
      }}
      onStart={() => {
        if (appearSpringRef.current) {
          appearSpringRef.current.destroy();
          appearSpringRef.current = null;
        }
      }}
      onExit={(el, _index, removeElement) => {
        isExitingRef.current = true;
        el.style.pointerEvents = "none";
        spring({
          onUpdate: (val) => {
            if (typeof val !== "number") {
              return;
            }
            el.style.opacity = `${1 * (1 - val)}`;
            el.style.transform = `translateY(${-30 * val}px)`;
          },
          onComplete: removeElement,
        });
      }}
      shouldFlip={() => {
        return !disabled && !isExitingRef.current;
      }}
    >
      <div>{children}</div>
    </Flipped>
  );
};
