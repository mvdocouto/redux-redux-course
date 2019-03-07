import React from "react";
import classNames from "classnames";

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

export default Note;
