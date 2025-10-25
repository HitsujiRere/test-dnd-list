import { DnDList2Columns } from "@/features/DnDList2Columns";
import { DnDList } from "@/features/DndList";

export default function Home() {
  return (
    <main className="p-8">
      <DnDList />

      <div className="m-4 border border-black" />

      <DnDList2Columns />
    </main>
  );
}
