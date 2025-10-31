import { DnDList } from "@/features/dnd-list";
import { DnDList2Columns } from "@/features/dnd-list-2col";
import { DnDFlipList } from "@/features/dnd-list-2col-nosort";
import { MultipleSortableLists } from "@/features/dnd-next-list";

export default function Home() {
  return (
    <main className="space-y-4 p-8">
      <DnDList />

      <DnDList2Columns />

      <DnDFlipList />

      <MultipleSortableLists />
    </main>
  );
}
