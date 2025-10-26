import { CollisionPriority } from "@dnd-kit/abstract";
import { useDroppable } from "@dnd-kit/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ColumnProps = {
  children: ReactNode;
  id: string;
};

export const Column = ({ children, id }: ColumnProps) => {
  const { isDropTarget, ref } = useDroppable({
    id,
    type: "column",
    accept: ["item", "column"],
    collisionPriority: CollisionPriority.Low,
  });

  return (
    <div
      ref={ref}
      className={cn(
        "flex min-h-32 w-32 flex-col gap-8 rounded-lg border-2 border-zinc-400 bg-white p-4",
        {
          "bg-zinc-50": isDropTarget,
        },
      )}
    >
      {children}
    </div>
  );
};
