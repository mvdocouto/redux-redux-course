import React from "react";
import uuid from "uuid/v1";
import NewNote from "./NewNote";
import NoteList from "./NoteList";
import AppBar from "./AppBar";

class App extends React.Component {
  state = {
    notes: [
      { id: 1, text: "Estudar React" },
      { id: 2, text: "Estudar Redux" },
      { id: 3, text: "Estudar Saga" }
    ]
  };

  handleAddNote = text => {
    this.setState(prevState => ({
      notes: prevState.notes.concat({ id: uuid(), text })
    }));
  };
  handleMove = (direction, index) => {
    this.setState(prevState => {
      const newNotes = prevState.notes.slice();
      const removedNote = newNotes.splice(index, 1)[0];
      if (direction === "up") {
        newNotes.splice(index - 1, 0, removedNote);
      } else {
        newNotes.splice(index + 1, 0, removedNote);
      }
      return {
        notes: newNotes
      };
    });
  };

  handleDelete = id => {
    this.setState(prevState => {
      const newNotes = prevState.notes.slice();
      const index = newNotes.findIndex(note => note.id === id);
      newNotes.splice(index, 1);

      return {
        notes: newNotes
      };
    });
  };

  handleEdit = (id, text) => {
    this.setState(prevState => {
      const newNotes = prevState.notes.slice();
      const index = newNotes.findIndex(note => note.id === id);
      newNotes[index].text = text;

      return {
        notes: newNotes
      };
    });
  };

  render() {
    return (
      <React.Fragment>
        <AppBar />
        <div className="container">
          <NewNote onAddNote={this.handleAddNote} />
          <NoteList
            notes={this.state.notes}
            onMove={this.handleMove}
            onDelete={this.handleDelete}
            onEdit={this.handleEdit}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
