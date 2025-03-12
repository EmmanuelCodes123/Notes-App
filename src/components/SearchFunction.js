import { useContext, useState } from "react";
import { NotesContext } from "../App";
import useCustomNavigate from "./hooks/useCustomNavigate";
import { ChevronLeft, Edit, Trash } from "lucide-react";

export function SearchFunction({ deleteNoteFunction }) {
  const { notes } = useContext(NotesContext);
  const [search, setSearch] = useState("");
  const [searchedNotes, setSearchedNotes] = useState([]);
  const { handleNavigate } = useCustomNavigate();
  const [path, setPath] = useState("/search");

  function runSearch(e) {
    setSearch(e.target.value);
    const matchedNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchedNotes(matchedNotes);
    console.log(matchedNotes);
  }

  return (
    <div className="searchContainer newWrapper">
      <div className="inputBox">
        <button
          onClick={() => handleNavigate(-1)}
          style={{ width: "fit-content" }}
          className="hover icon"
          type="button"
        >
          <ChevronLeft color="#fff" />
        </button>

        <input value={search} onChange={runSearch} />
      </div>
      <div className="searchedNotes">
        {searchedNotes.map((note, i) => (
          <div
            key={i}
            className="noteBox"
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{ color: "#fff", marginRight: "20rem" }}
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
                onClick={() => {
                  setPath(`/edit/${note.id}`);
                }}
              />
              <Trash
                onClick={() => {
                  deleteNoteFunction(note.id);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
