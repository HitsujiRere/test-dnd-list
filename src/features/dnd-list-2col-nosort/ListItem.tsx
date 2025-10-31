"use client";

import { useDraggable, useDroppable } from "@dnd-kit/core";
import { useCombinedRefs } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import type { Item } from "./item";
import { ListItemView } from "./ListItemView";

type ListItemProps = {
  item: Item;
  index: number;
  onRemove: () => void;
};

export const ListItem = ({ item, index, onRemove }: ListItemProps) => {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef: setDraggableNodeRef,
    setActivatorNodeRef,
  } = useDraggable({
    id: item.id,
    data: { index },
  });
  const { setNodeRef: setDroppableNodeRef } = useDroppable({
    id: item.id,
    data: { index },
  });

  // 同じ場所にrefを渡す必要があるのでsortableのコードを見てconbineする
  // https://github.com/clauderic/dnd-kit/blob/%40dnd-kit/sortable%407.0.2/packages/sortable/src/hooks/useSortable.ts#L108
  const setNodeRef = useCombinedRefs(setDraggableNodeRef, setDroppableNodeRef);

  return (
    <div
      ref={setNodeRef}
      className={cn({
        "opacity-50": isDragging,
      })}
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
