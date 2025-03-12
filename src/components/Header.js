import { useContext, useState } from "react";
import { Search } from "lucide-react";
import { NotesContext } from "../App";
import useCustomNavigate from "./hooks/useCustomNavigate";

export function Header() {
  const [input, setInput] = useState(false);
  const { handleNavigate } = useCustomNavigate();

  function changeState() {
    setInput(true);
    if (input === true) {
      handleNavigate("search");
    }
  }

  return (
    <header style={{zIndex: '1000', backgroundColor: 'rgb(37, 37, 37)'}}>
      <h1>Notes</h1>
      <div className="addNotes">
        <Search color="#fff" onClick={changeState} className="hover"/>
      </div>
    </header>
  );
}
