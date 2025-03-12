import { useContext } from "react";
import { NotesContext } from "../App";
import { useParams } from "react-router";
import { ChevronLeft } from "lucide-react";
import useCustomNavigate from "./hooks/useCustomNavigate";

export function OpenNote() {
  const { noteId } = useParams();
  const { notes } = useContext(NotesContext);
  const {handleNavigate} = useCustomNavigate()

  const note = notes.find((note) => note.id === Number(noteId));

  console.log(note.color, note.body)

  return (
    <div className="readNote">
      <div className="icons">
        <button
          onClick={() => handleNavigate(-1)}
          style={{ width: "fit-content" }}
          className="hover icon"
          type="button"
        >
          <ChevronLeft color="#fff" style={{width: '100%', height: '100%'}}/>
        </button>
      </div>
      <div className="title">
        <h1>{note.title}</h1>
      </div>
      <div className="body">
        <h2>{note.body}</h2>
      </div>
    </div>
  );
}
