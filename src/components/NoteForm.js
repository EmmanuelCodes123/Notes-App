import { useState, useContext } from "react";
import { NotesContext } from "../App";
import { ChevronLeft } from "lucide-react";
import useCustomNavigate from "./hooks/useCustomNavigate";
import { useParams } from "react-router";
import { getRandom4Digit } from "./utils/getRandomNum";

export function NoteForm() {
  const { noteId } = useParams();
  const { handleSetNotes, notes } = useContext(NotesContext);

  const editableNote = notes.find((n) => n?.id === noteId);
  const [title, setTitle] = useState(editableNote?.title || "");
  const [body, setBody] = useState(editableNote?.body || "");
  const [color, setColor] = useState("orange");
  const [border, setBorder] = useState("");
  const { handleNavigate } = useCustomNavigate();
  const colors = ["orange", "blue", "green", "red", "orange"];

  function submitForm(e) {
    e.preventDefault();
    if (!body || !title) return;

    const randomNum = getRandom4Digit();

    handleSetNotes({ id: randomNum, title, body, color });
    handleNavigate(-1);
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
              className={`hover ${border === num ? "active" : ""}`}
              style={{
                width: "25%",
                height: "100%",
                backgroundColor: `${colors[num]}`,
                borderRadius: "50%",
              }}
              onClick={() => {
                setColor(colors[num]);
                setBorder(num);
              }}
            ></div>
          ))}
        </div>
      </div>
      <form onSubmit={submitForm} style={{ width: "100%" }}>
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
          style={{ minHeight: "12rem" }}
        ></textarea>
        <div className="saveBtnDiv">
          <button className="saveBtn hover">Save</button>
        </div>
      </form>
    </div>
  );
}
