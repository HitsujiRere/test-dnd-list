"use client";

import { closestCenter, DndContext, DragOverlay } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useState } from "react";
import type { Item } from "./item";
import { ListItem } from "./ListItem";
import { ListItemView } from "./ListItemView";

const ITEMS: Item[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

export const DnDList = () => {
  const [items, setItems] = useState(ITEMS);

  const [activeId, setActiveId] = useState<number | null>(null);
  const activeItem = items.find((item) => item.id === activeId);

  return (
    <div className="flex flex-col gap-4">
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={(event) => {
          setActiveId(event.active.id as number);
        }}
        onDragEnd={({ active, over }) => {
          setActiveId(null);
          if (over == null || active.id === over.id) {
            return;
          }
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over.id);
          const newItems = arrayMove(items, oldIndex, newIndex);
          setItems(newItems);
        }}
      >
        <SortableContext items={items}>
          {items.map((item) => (
            <ListItem key={item.id} item={item} />
          ))}
        </SortableContext>
        <DragOverlay>
          {activeItem && <ListItemView item={activeItem} />}
        </DragOverlay>
      </DndContext>

      <button
        type="button"
        className="border-2 border-neutral-500 p-4"
        onClick={() => setItems((item) => [...item, { id: item.length + 1 }])}
      >
        +
      </button>
    </div>
  );
};
