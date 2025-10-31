"use client";

import { DndContext, DragOverlay } from "@dnd-kit/core";
import { arraySwap, SortableContext } from "@dnd-kit/sortable";
import { useState } from "react";
import { Flipper } from "react-flip-toolkit";
import { FlippedItem } from "@/components/FlippedItem";
import { shuffle } from "@/utils/shuffle";
import type { Item } from "./item";
import { ListItem } from "./ListItem";
import { ListItemView } from "./ListItemView";
import { useTestItems } from "./useTestItems";

const ITEMS: Item[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

export const DnDList = () => {
  const { items, setItems, appendItem } = useTestItems(ITEMS);

  const [activeId, setActiveId] = useState<number | null>(null);
  const activeItem = items.find((item) => item.id === activeId);

  return (
    <div className="flex flex-col gap-4">
      <DndContext
        onDragStart={({ active }) => {
          setActiveId(active.id as number);
        }}
        onDragEnd={({ active, over }) => {
          if (over == null || active.id === over.id) {
            return;
          }
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over.id);
          const newItems = arraySwap(items, oldIndex, newIndex);
          setItems(newItems);
          // 項目を更新した瞬間はまだドラッグ中にしたいのでワンテンポ遅れてからfalseにする
          setTimeout(() => {
            setActiveId(null);
          });
        }}
      >
        <SortableContext items={items}>
          <Flipper
            flipKey={items.map((item) => item.id).join(",")}
            className="flex flex-col gap-4"
          >
            {items.map((item) => (
              <FlippedItem
                key={item.id}
                flipId={item.id}
                disabled={!!activeItem}
              >
                <div>
                  <ListItem
                    key={item.id}
                    item={item}
                    onRemove={() =>
                      setItems((items) => items.filter((x) => x.id !== item.id))
                    }
                  />
                </div>
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
        onClick={() => appendItem()}
      >
        +
      </button>

      <button
        type="button"
        className="border-2 border-neutral-500 p-4"
        onClick={() => setItems((items) => shuffle(items))}
      >
        shuffle
      </button>
    </div>
  );
};
