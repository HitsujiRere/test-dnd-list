"use client";

import { DndContext, DragOverlay } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useState } from "react";
import { Flipper } from "react-flip-toolkit";
import { FlippedItem } from "./FlippedItem";
import type { Item } from "./item";
import { ListItem } from "./ListItem";
import { ListItemView } from "./ListItemView";

const ITEMS: Item[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

export const DnDList = () => {
  const [items, setItems] = useState(ITEMS);

  const [activeId, setActiveId] = useState<number | null>(null);
  const activeItem = items.find((item) => item.id === activeId);

  const shuffleItems = () => {
    setItems((items) => {
      const newItems = [...items];
      for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newItems[i], newItems[j]] = [newItems[j], newItems[i]];
      }
      return newItems;
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <DndContext
        onDragStart={(event) => {
          setActiveId(event.active.id as number);
        }}
        onDragEnd={({ active, over }) => {
          if (over == null || active.id === over.id) {
            return;
          }
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over.id);
          const newItems = arrayMove(items, oldIndex, newIndex);
          setItems(newItems);

          // 項目を更新した瞬間はまだドラッグ中にしたいのでワンテンポ遅れてからfalseにする
          setTimeout(() => {
            setActiveId(null);
          });
        }}
      >
        <SortableContext items={items}>
          <Flipper flipKey={items.map((item) => item.id).join(",")}>
            {items.map((item) => (
              <FlippedItem
                key={item.id}
                flipId={item.id}
                disabled={!!activeItem}
              >
                <ListItem key={item.id} item={item} />
              </FlippedItem>
            ))}
          </Flipper>
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

      <button
        type="button"
        className="border-2 border-neutral-500 p-4"
        onClick={shuffleItems}
      >
        shuffle
      </button>
    </div>
  );
};
