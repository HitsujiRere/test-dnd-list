"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import type { Item } from "./item";
import { ListItemView } from "./ListItemView";

type ListItemProps = {
  item: Item;
  onRemove: () => void;
};

export const ListItem = ({ item, onRemove }: ListItemProps) => {
  const {
    isDragging,
    setActivatorNodeRef,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  return (
    <div
      ref={setNodeRef}
      className={cn({
        "opacity-0": isDragging,
      })}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <ListItemView
        item={item}
        handlerProps={{
          ref: setActivatorNodeRef,
          attributes,
          listeners,
        }}
        onRemove={onRemove}
      />
    </div>
  );
};
