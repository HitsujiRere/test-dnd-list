"use client";

import type {
  DraggableAttributes,
  DraggableSyntheticListeners,
} from "@dnd-kit/core";
import { GripVerticalIcon } from "lucide-react";
import type { Item } from "./item";

export const ListItemView = ({
  item,
  handlerProps,
}: {
  item: Item;
  handlerProps?: {
    ref: (element: HTMLElement | null) => void;
    attributes: DraggableAttributes;
    listeners: DraggableSyntheticListeners;
  };
}) => {
  return (
    <div className="border-2 border-neutral-500 bg-white p-4">
      <div className="flex items-center gap-4">
        <div
          ref={handlerProps?.ref}
          className={handlerProps ? "cursor-grabbing" : "cursor-grab"}
          {...handlerProps?.attributes}
          {...handlerProps?.listeners}
        >
          <GripVerticalIcon />
        </div>
        <div>{item.id}</div>
      </div>
    </div>
  );
};
