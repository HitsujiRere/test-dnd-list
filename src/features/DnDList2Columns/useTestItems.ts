import { useCallback, useMemo, useState } from "react";
import type { Item } from "./item";

export const useTestItems = (initial: Item[]) => {
  const initialItems = useMemo(() => {
    const itemsA = initial.filter((item) => item.team === "A");
    const itemsB = initial.filter((item) => item.team === "B");
  }, []);

  const [items, setItems] = useState(initial);
  const [nextId, setNextId] = useState(
    Math.max(...initial.map((item) => item.id)) + 1,
  );

  const appendItem = useCallback(
    (team: Item["team"]) => {
      setItems((items) => [...items, { id: nextId, team }]);
      setNextId((nextId) => nextId + 1);
    },
    [nextId],
  );

  return {
    items,
    setItems,
    appendItem,
  };
};
