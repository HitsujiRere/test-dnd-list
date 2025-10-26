"use client";

import { move } from "@dnd-kit/helpers";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { useState } from "react";
import { Column } from "./Column";
import { Item } from "./Item";
import { ItemView } from "./ItemView";

export const List = () => {
  const [items, setItems] = useState({
    A: ["A0", "A1", "A2"],
    B: ["B0", "B1"],
    C: [],
  });

  return (
    <DragDropProvider
      onDragOver={(event) => {
        setItems((items) => move(items, event));
      }}
    >
      <div className="flex flex-wrap gap-8">
        {Object.entries(items).map(([column, items]) => (
          <Column key={column} id={column}>
            {items.map((id, index) => (
              <Item key={id} id={id} index={index} column={column} />
            ))}
          </Column>
        ))}
      </div>

      <DragOverlay>
        {(source) => <ItemView id={source.id as string} />}
      </DragOverlay>
    </DragDropProvider>
  );
};
