import { useContext, useState } from "react";
import { NotesContext } from "../App";
import useCustomNavigate from "./hooks/useCustomNavigate";
import { ChevronLeft, Edit, Trash } from "lucide-react";

export function SearchFunction({ deleteNoteFunction }) {
  const { notes } = useContext(NotesContext);
  const [search, setSearch] = useState("");
  const [searchedNotes, setSearchedNotes] = useState([]);
  const { handleNavigate } = useCustomNavigate();

  function runSearch(e) {
    setSearch(e.target.value);
    let matchedNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchedNotes(matchedNotes);
  }

  return (
    <div className="searchContainer newWrapper">
      <div className="inputBox">
        <button
          onClick={() => handleNavigate(-1)}
          style={{ width: "fit-content", marginLeft: "2rem" }}
          className="hover icon"
          type="button"
        >
          <ChevronLeft color="#fff" />
        </button>

        <input value={search} onChange={runSearch} />
      </div>
      <div
        className="searchedNotes"
        style={{
          width: "50rem",
        }}
      >
        {searchedNotes.map((note, i) => (
          <div
            key={i}
            className="noteBox"
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "spaceBetween",
            }}
          >
            <div
              style={{
                color: "#fff",
                justifyContent: "flex-end",
                display: "flex",
                flexDirection: "column",
              }}
              onClick={() => {
                handleNavigate(`/readNote/${note.id}`);
                console.log("at once");
              }}
              className="searchedNote"
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
                  handleNavigate(`/edit/${note.id}`);
                }}
                className="hover"
              />
              <Trash
                onClick={() => {
                  deleteNoteFunction(note.id);
                  setSearchedNotes(
                    searchedNotes.filter((notes) => notes.id !== note.id)
                  );
                }}
                className="hover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
