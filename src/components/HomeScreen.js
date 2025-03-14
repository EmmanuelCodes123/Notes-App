import { Plus } from "lucide-react";
import { Header } from "./Header";
import { Notes } from "./Notes";
import useCustomNavigate from "./hooks/useCustomNavigate";

export function HomeScreen({ deleteNoteFunction }) {
  const { handleNavigate } = useCustomNavigate();

  return (
    <>
      <div className="wrapper newWrapper">
        <Header />
        <Notes deleteNoteFunction={deleteNoteFunction} />
      </div>

      <div class="button">
        <button onClick={() => handleNavigate("new")} className="addButton hover">
          <Plus/>
        </button>
      </div>
    </>
  );
}
