"use client";

import { DndContext, DragOverlay, pointerWithin } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useId, useState } from "react";
import { Flipper } from "react-flip-toolkit";
import { shuffle } from "@/utils/shuffle";
import { FlippedItem } from "../DndList/FlippedItem";
import { type Item, swapItem } from "./item";
import { ListItem } from "./ListItem";
import { ListItemView } from "./ListItemView";
import { useTestItems } from "./useTestItems";

const ITEMS: Item[] = [
  { id: 1, team: "A" },
  { id: 2, team: "A" },
  { id: 3, team: "A" },
  { id: 4, team: "B" },
  { id: 5, team: "B" },
  { id: 6, team: "B" },
];

export const List = () => {
  const { items, setItems, appendItem } = useTestItems(ITEMS);
  // const itemsA = items.filter((item) => item.team === "A");
  // const itemsB = items.filter((item) => item.team === "B");

  const [activeId, setActiveId] = useState<number | null>(null);
  const activeItem = items.find((item) => item.id === activeId);

  const id = useId();

  return (
    <div className="flex flex-col gap-8">
      <DndContext
        // Hydration Error対策
        id={id}
        collisionDetection={pointerWithin}
        onDragStart={({ active }) => {
          setActiveId(active.id as number);
        }}
        onDragOver={({ active, over }) => {
          if (over == null || active.id === over.id) {
            return;
          }
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over.id);
          // const newItems = arraySwap(items, oldIndex, newIndex);
          const newItems = [...items];
          [newItems[oldIndex], newItems[newIndex]] = swapItem(
            newItems[oldIndex],
            newItems[newIndex],
          );
          setItems(newItems);
        }}
        onDragEnd={() => {
          // 項目を更新した瞬間はまだドラッグ中にしたいのでワンテンポ遅れてからfalseにする
          setTimeout(() => {
            setActiveId(null);
          });
        }}
      >
        <div className="grid grid-cols-2 gap-8">
          <SortableContext items={items}>
            <Flipper
              flipKey={items.map((item) => item.id).join(",")}
              className="col-span-2 grid grid-flow-dense grid-cols-2 gap-8"
            >
              {items.map((item) => (
                <div key={item.id}>
                  <FlippedItem
                    key={item.id}
                    flipId={item.id}
                    disabled={!!activeItem}
                  >
                    <ListItem
                      key={item.id}
                      item={item}
                      onRemove={() =>
                        setItems((items) =>
                          items.filter(
                            (filtingItem) => filtingItem.id !== item.id,
                          ),
                        )
                      }
                    />
                  </FlippedItem>
                </div>
              ))}
            </Flipper>
          </SortableContext>
          <button
            type="button"
            className="border-2 border-neutral-500 p-4"
            onClick={() => appendItem("A")}
          >
            +
          </button>
          <button
            type="button"
            className="border-2 border-neutral-500 p-4"
            onClick={() => appendItem("B")}
          >
            +
          </button>
        </div>

        <DragOverlay>
          {activeItem && <ListItemView item={activeItem} />}
        </DragOverlay>
      </DndContext>

      <button
        type="button"
        className="col-span-2 border-2 border-neutral-500 p-4"
        onClick={() => setItems((items) => shuffle(items, swapItem))}
      >
        shuffle
      </button>
    </div>
  );
};
