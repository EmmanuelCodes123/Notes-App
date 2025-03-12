import { createContext, useEffect, useState } from "react";
import { HomeScreen } from "./components/HomeScreen";
import { NoteForm } from "./components/NoteForm";
import { EditNote } from "./components/EditNote";
import { Routes, Route } from "react-router";
import { SearchFunction } from "./components/SearchFunction";
import { OpenNote } from "./components/OpenNote";

export const NotesContext = createContext();

function App() {
  const [notes, setNotes] = useState(() => {
    const localData = localStorage.getItem("notes");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  
  function handleDelete(id) {
    setNotes(notes.filter((item) => item.id !== id));
  }

  function handleSetNotes(note, action) {
    console.log(note.id);
    if (action === "edit") {
      setNotes((cur) =>
        cur.map((n) =>
          n.id === note?.id ? { ...n, title: note.title, body: note.body, color: note.color } : n
        )
      );
      return;
    }
    setNotes((cur) => [...cur, note]);
  }
  return (
    <NotesContext.Provider value={{ notes, handleSetNotes }}>
      <Routes>
        <Route
          path="/"
          element={<HomeScreen deleteNoteFunction={handleDelete} />}
        />
        <Route path="/new" element={<NoteForm />} />
        <Route path="/edit/:noteId" element={<EditNote />} />
        <Route
          path="/search"
          element={<SearchFunction deleteNoteFunction={handleDelete} />}
        />
        <Route path="/readNote/:noteId" element={<OpenNote />} />
      </Routes>
    </NotesContext.Provider>
  );
}

export default App;
