import { useSortable } from "@dnd-kit/react/sortable";
import { useRef } from "react";
import { ItemView } from "./ItemView";

export type ItemProps = {
  id: string;
  index: number;
  column: string;
};

export const Item = ({ id, index, column }: ItemProps) => {
  const handleRef = useRef(null);

  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "item",
    accept: "item",
    group: column,
    handle: handleRef,
  });

  return (
    <ItemView id={id} ref={ref} isDragging={isDragging} handleRef={handleRef} />
  );
};
