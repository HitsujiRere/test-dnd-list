"use client";

import { move } from "@dnd-kit/helpers";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { useState } from "react";
import { Flipper } from "react-flip-toolkit";
import { Button } from "@/components/ui/button";
import { choice } from "@/utils/choice";
import { Column } from "./Column";
import { FlippedItem } from "./FlippedItem";
import { Item } from "./Item";
import { ItemView } from "./ItemView";

export const List = () => {
  const [items, setItems] = useState<Record<string, string[]>>({
    A: ["A0", "A1", "A2"],
    B: ["B0", "B1"],
    C: [],
  });

  const shuffleItems = () => {
    setItems((items) => {
      const columns = Object.keys(items);
      const values = Object.entries(items)
        .flatMap(([_column, items]) => items)
        .map((item) => ({ item, column: choice(columns) }));
      const group = {
        ...Object.fromEntries(columns.map((column) => [column, []])),
        ...Object.groupBy(values, (item) => item.column),
      };
      return Object.fromEntries(
        Object.entries(group).map<[string, string[]]>(([columns, item]) => [
          columns,
          item?.map((item) => item.item) ?? [],
        ]),
      );
    });
  };

  return (
    <DragDropProvider
      onDragOver={(event) => {
        setItems((items) => move(items, event));
      }}
    >
      <Flipper
        flipKey={Object.entries(items)
          .map(([_column, items]) => items.join(","))
          .join(";")}
      >
        <div className="flex flex-wrap gap-8">
          {Object.entries(items).map(([column, items]) => (
            <Column key={column} id={column}>
              <div>{column}</div>
              {items.map((id, index) => (
                <FlippedItem key={id} flipId={id}>
                  <Item id={id} index={index} column={column} />
                </FlippedItem>
              ))}
            </Column>
          ))}

          <Button onClick={shuffleItems}>shuffle</Button>
        </div>
      </Flipper>

      <DragOverlay>
        {(source) => <ItemView id={source.id as string} />}
      </DragOverlay>
    </DragDropProvider>
  );
};
