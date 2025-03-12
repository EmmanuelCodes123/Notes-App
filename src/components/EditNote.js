import { useContext, useState } from "react";
import useCustomNavigate from "./hooks/useCustomNavigate";
import { ChevronLeft } from "lucide-react";
import { useParams } from "react-router";
import { NotesContext } from "../App";

export function EditNote() {
  const { noteId } = useParams();
  const { handleSetNotes, notes } = useContext(NotesContext);

  const editableNote = notes.find((n) => n.id === Number(noteId))
  
  const colors = ["orange", "blue", "green", "red", "orange"];
  const [color, setColor] = useState('orange');
  const [border, setBorder] = useState('');

  const { handleNavigate } = useCustomNavigate();
  const [title, setTitle] = useState(editableNote?.title || "");
  const [body, setBody] = useState(editableNote?.body || "");

  function submitForm(e) {
    e.preventDefault();
    if (!body || !title) return;

    handleSetNotes({id: Number(noteId), title, body, color},'edit');
    console.log(color);
    
    handleNavigate('/')
  }

  return (
    <div className="wrapper noteArea">
      <div className="icons">
        <button
          onClick={() => handleNavigate(-1)}
          style={{ width: "fit-content" }}
          className="hover icon"
          type="button"
        >
          <ChevronLeft color="#fff" />
        </button>

        <div
          className="colors"
          style={{
            width: "23rem",
            height: "6rem",
            display: "flex",
            columnGap: "1rem",
          }}
        >
          {Array.from({ length: 4 }, (_, i) => i + 1).map((num) => (
            <div
              className={`hover ${border === num ? 'active' : ""}`}
              style={{
                width: "25%",
                height: "100%",
                backgroundColor: `${colors[num]}`,
                borderRadius: '10rem'
              }}
              onClick={() => {
                setColor(colors[num]);
                setBorder(num)
              }}
            ></div>
          ))}
        </div>
      </div>
      <form onSubmit={submitForm}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          id="title"
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <textarea
          name="note"
          id="note"
          placeholder="Type Something..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button className="saveBtn hover">Save</button>
      </form>
    </div>
  );
}
