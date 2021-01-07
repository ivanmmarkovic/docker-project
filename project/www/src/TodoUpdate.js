import React from "react";
import "./style.css";
import "./TodoUpdate.css";

class TodoUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.todo._id,
      todoValue: props.todo.body,
      done: props.todo.done,
      infoElement: null,
    };
    this.changeTodoState = this.changeTodoState.bind(this);
    this.handleTodoValueChange = this.handleTodoValueChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  changeTodoState() {
    let { id, done, todoValue } = this.state;
    this.setState({ done: !done });
    let todo = { _id: id, body: todoValue, done: !done };
    this.props.changeTodoState(todo);
  }
  handleTodoValueChange(e) {
    this.setState({ todoValue: e.target.value });
  }
  handleUpdate(e) {
    e.preventDefault();
    let { url } = this.props;
    let { id, todoValue, done } = this.state;
    if (todoValue == "") {
      this.setState({
        infoElement: <p>Input field is empty</p>
      });
    }
    else {
      this.setState({
        infoElement: <div className={"progress"}>
          <div className={"indeterminate"} />
        </div>
      });
      let todo = {
        id,
        body: todoValue,
        done: done
      };
      // make patch request to the server
      fetch(`${url}/${id}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          if (data.status != 200) {
            throw new Error(data.message);
          }

          let t = data.data;
          this.props.handleUpdatedTodo(t);
          setTimeout(() => {
            this.setState({
              infoElement: <p>Todo updated</p>
            });
          }, 1000);
        })
        .catch(err => {
          this.setState({
            infoElement: <p>{err.message}</p>
          })
          console.log(err);
        });



    }
  }
  render() {
    let { todoValue, done, infoElement } = this.state;
    return (
      <div className={"update-todo-form"}>
        <label>
          <input type="checkbox" checked={done} onChange={() => this.changeTodoState()} />
          <span className={!done ? "" : "overwritten"}>{done ? "completed" : "not completed"}</span>
        </label>
        <input type="text" value={todoValue} onChange={this.handleTodoValueChange} />
        {infoElement}
        <i class={"material-icons"} onClick={this.handleUpdate}>edit</i>
      </div>
    );
  }
}

export default TodoUpdate;