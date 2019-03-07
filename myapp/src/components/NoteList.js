import React from "react";

import Note from "./Note";

const NoteList = ({ notes, onMove, onDelete, onEdit }) => {
  return (
    <div className="note-list">
      {notes.map((note, index) => (
        <Note
          key={note.id}
          onMove={onMove}
          onDelete={onDelete}
          onEdit={onEdit}
          note={note}
          index={index}
          count={notes.length}
        />
      ))}
    </div>
  );
};

export default NoteList;
