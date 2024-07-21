import React, {  useState ,useEffect} from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from 'axios';
function App() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null); 
  useEffect(()=>{
    const fetchdata=async()=>{
      try{
        const Notes=await axios.get("/Notes");
        console.log(Notes.data);
        setNotes(Notes.data);
      }
      catch(err){
        setError(err.message);
        console.log(err);
      }
    }
    fetchdata();
  },[]);

  async function addNote(newNote) {
    try{
      const setNote=await axios.post('/Note',{newNote});
      setNotes((old)=>{
        return[...old,setNote.data]
      });
    }
    catch(err){
      setError("err");
      console.log(err);
    }
  }

  async function deleteNote(id) {
    try{
      console.log(notes[id].note_id);
      setNotes(prevNotes => {
        return prevNotes.filter((noteItem, index) => {
          return index !== id;
        });
      });
      const deleteNoteResponse = await axios.delete('/Notes', {
        data: { node_id: notes[id].note_id }
      });
      
    }
    catch(err){
      setError("err");
      console.log(err);
      
    }
  }
  return (
    <div>
      {error && <div className="error">{error}</div>}
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
