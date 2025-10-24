"use client";

import type {
  DraggableAttributes,
  DraggableSyntheticListeners,
} from "@dnd-kit/core";
import { GripVerticalIcon, Trash2Icon } from "lucide-react";
import type { Item } from "./item";

type ListItemViewProps = {
  item: Item;
  handlerProps?: {
    ref: (element: HTMLElement | null) => void;
    attributes: DraggableAttributes;
    listeners: DraggableSyntheticListeners;
  };
  onRemove?: () => void;
};

export const ListItemView = ({
  item,
  handlerProps,
  onRemove,
}: ListItemViewProps) => {
  return (
    <div className="border-2 border-neutral-500 bg-white p-4">
      <div className="flex items-center gap-4">
        <button
          type="button"
          ref={handlerProps?.ref}
          className={handlerProps ? "cursor-grabbing" : "cursor-grab"}
          {...handlerProps?.attributes}
          {...handlerProps?.listeners}
        >
          <GripVerticalIcon />
        </button>
        <div>{item.id}</div>
        <button type="button" onClick={onRemove} disabled={!onRemove}>
          <Trash2Icon />
        </button>
      </div>
    </div>
  );
};
