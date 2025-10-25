export type Swapper<T> = (x: T, y: T) => [T, T];

export const shuffle = <T>(
  _items: T[],
  swapper: Swapper<T> | undefined = undefined,
) => {
  const items = [..._items];
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    if (swapper) {
      [items[i], items[j]] = swapper(items[i], items[j]);
    } else {
      [items[i], items[j]] = [items[j], items[i]];
    }
  }
  return items;
};
