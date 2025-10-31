export type Item = {
  id: number;
  team: "A" | "B";
};

export const swapItem = (x: Item, y: Item): [Item, Item] => {
  return [
    { id: y.id, team: x.team },
    { id: x.id, team: y.team },
  ];
};
