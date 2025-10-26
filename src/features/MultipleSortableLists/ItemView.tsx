import { GripVerticalIcon } from "lucide-react";
import type { RefObject } from "react";
import { cn } from "@/lib/utils";

export type ItemProps = {
  id: string;
  ref?: (element: Element | null) => void;
  isDragging?: boolean;
  handleRef?: RefObject<null>;
};

export const ItemView = ({ id, ref, isDragging, handleRef }: ItemProps) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex gap-2 rounded border-2 border-blue-300 bg-sky-100 p-2",
        { "opacity-30": isDragging },
      )}
    >
      <button
        ref={handleRef}
        type="button"
        className="cursor-grab"
        disabled={handleRef === null}
      >
        <GripVerticalIcon className="size-4" />
      </button>
      <div>{id}</div>
    </div>
  );
};
