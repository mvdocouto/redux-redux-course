import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import uuid from "uuid/v1";

import "./index.scss";

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
      <div className="container">
        <NewNote onAddNote={this.handleAddNote} />
        <NoteList
          notes={this.state.notes}
          onMove={this.handleMove}
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}
        />
      </div>
    );
  }
}

class NewNote extends React.Component {
  state = {
    text: ""
  };
  render() {
    const { onAddNote } = this.props;
    const { text } = this.state;
    return (
      <div className="new-note">
        <input
          type="text"
          className="new-note__input"
          placeholder="Digite sua nota"
          value={text}
          onChange={event => {
            this.setState({
              text: event.target.value
            });
          }}
          onKeyPress={event => {
            if (event.key === "Enter") {
              onAddNote(event.target.value);
              this.setState({
                text: ""
              });
            }
          }}
        />
      </div>
    );
  }
}

class Note extends React.Component {
  state = {
    isEditing: false
  };

  handleEdit = () => {
    this.setState({
      isEditing: true
    });
  };

  handleCancel = () => {
    this.setState({
      isEditing: false
    });
  };

  handleSave = () => {
    this.setState({
      isEditing: false
    });
    this.props.onEdit(this.props.note.id, this.input.value);
  };

  render() {
    const { note, onEdit, onDelete, onMove, index, count } = this.props;
    const { isEditing } = this.state;
    return (
      <div className="note">
        {isEditing ? (
          <input
            className="note__input"
            type="text"
            defaultValue={note.text}
            ref={c => {
              this.input = c;
            }}
          />
        ) : (
          <span className="note__text">{note.text}</span>
        )}

        {isEditing ? (
          <React.Fragment>
            <button
              className={"note__button--red"}
              onClick={() => {
                this.handleCancel();
              }}
            >
              <i className="material-icons">cancel</i>
            </button>
            <button
              className={"note__button--green"}
              onClick={() => {
                this.handleSave();
              }}
            >
              <i className="material-icons">done_outline</i>
            </button>
          </React.Fragment>
        ) : null}

        <button
          disabled={isEditing}
          className={"note__button"}
          onClick={event => {
            this.handleEdit();
          }}
        >
          <i className="material-icons">edit</i>
        </button>
        <button
          disabled={isEditing}
          className={"note__button"}
          onClick={() => {
            onDelete(note.id);
          }}
        >
          <i className="material-icons">delete</i>
        </button>
        <button
          className={classNames("note__button", {
            "note__button--hidden": index === 0
          })}
          onClick={() => {
            onMove("up", index);
          }}
        >
          <i className="material-icons">arrow_upward</i>
        </button>
        <button
          className={classNames("note__button", {
            "note__button--hidden": index === count - 1
          })}
          onClick={() => {
            onMove("down", index);
          }}
        >
          <i className="material-icons">arrow_downward</i>
        </button>
      </div>
    );
  }
}

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

ReactDOM.render(<App />, document.getElementById("root"));
