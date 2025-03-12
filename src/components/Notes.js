import { useContext } from "react";
import { NotesContext } from "../App";
import { Edit, Trash } from "lucide-react";
import useCustomNavigate from "./hooks/useCustomNavigate";

export function Notes({ deleteNoteFunction }) {
  const { notes } = useContext(NotesContext);
  const { handleNavigate } = useCustomNavigate();
  if (notes.length === 0) {
    return (
      <div className="createFirstNote">
        <img
          src="/images/writing.jpeg"
          alt="notes logo"
          className="image"
        ></img>
        <h2 style={{ fontSize: "3rem" }}>Create Your First Note</h2>
      </div>
    );
  }

  return (
    <div style={{ paddingInline: "2rem"  }}>
      {notes.map(
        (note, i) =>
          notes.delete || (
            <div
              key={i}
              className="noteBox"
              style={{
                backgroundColor: `${note.color}`,
                marginTop: "1rem",
                padding: "1rem",
                borderRadius: "2rem",
              }}
            >
              <div
                className="note hover"
                style={{ color: "#fff", width: "100%" }}
                onClick={() => {
                  handleNavigate(`/readNote/${note.id}`);
                }}
              >
                <h1 style={{ fontSize: " 2rem" }}>{note.title}</h1>
                <p style={{ fontSize: " 1.5rem", color: "#eee6" }}>
                  {note.body.slice(0, 40) + "..."}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  color: "#fff",
                  alignItems: "center",
                }}
              >
                <Edit
                  className="hover"
                  onClick={() => {
                    handleNavigate(`edit/${note.id}`);
                  }}
                />
                <Trash
                  className="hover"
                  onClick={() => {
                    deleteNoteFunction(note.id);
                  }}
                />
              </div>
            </div>
          )
      )}
    </div>
  );
}
