import React from "react";
import "./style.css";
import "./Todos.css";

import { Link } from "react-router-dom";

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infoElement: null,
      todoValue: ""
    };
    this.changeTodoState = this.changeTodoState.bind(this);
    this.handleTodoValueChange = this.handleTodoValueChange.bind(this);
    this.handleTodoSubmit = this.handleTodoSubmit.bind(this);
  }
  changeTodoState(todo) {
    this.props.changeTodoState(todo);
  }
  handleTodoValueChange(e) {
    this.setState({
      todoValue: e.target.value
    })
  }
  handleTodoSubmit() {
    let { url } = this.props;
    let { todoValue } = this.state;
    if (todoValue == "") {
      this.setState({
        infoElement: <p>Input field is empty</p>
      })
    }
    else {
      this.setState({
        infoElement: <div className={"progress"}>
          <div className={"indeterminate"} />
        </div>
      });
      // make call to server, get todo from response 
      fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ body: todoValue })
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          if (data.status != 201) {
            throw new Error(data.message);
          }

          let t = data.data;
          this.props.addTodo(t);
          setTimeout(() => {
            this.setState({
              infoElement: <p>Todo created</p>,
              todoValue: ""
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
  deleteTodo(id) {
    this.setState({
      infoElement: <div className={"progress"}>
        <div className={"indeterminate"} />
      </div>
    });
    // make call to server, delete todo from response 
    let { url } = this.props;
    fetch(`${url}/${id}`, {
      method: 'DELETE',
      mode: 'cors'
    })
      .then(data => {
        this.props.deleteTodo(id);
        setTimeout(() => {
          this.setState({
            infoElement: <p>Todo deleted</p>
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
  render() {
    let { todos, loaded } = this.props;
    let { infoElement, todoValue } = this.state;
    if (!loaded)
      return (
        <div className={"todos-box"}>
          <div className={"progress"}>
            <div className={"indeterminate"} />
          </div>
        </div>
      );
    return (
      <div className={"todos-box"}>
        <div className={"add-todo-form-wrapper"}>
          <div className={"add-todo-form"}>
            <input type="text" placeholder="Add todo" value={todoValue} onChange={this.handleTodoValueChange} />
            <button class="waves-effect waves-light btn" onClick={this.handleTodoSubmit}>+</button>
          </div>
          {infoElement}
          {/*
          <div className={"progress"}>
            <div className={"indeterminate"} />
          </div>
          <p>Message after http request</p>
          */}
        </div>
        <div className={"todos-all-box"}>
          {todos.map(todo => (
            <div key={todo._id} className={"todo-single"}>
              <label>
                <input type="checkbox" checked={todo.done} onChange={() => this.changeTodoState(todo)} />
                <span className={!todo.done ? "" : "overwritten"}>{todo.body}</span>
              </label>
              <div className={"todo-actions"}>
                <Link
                  to={`/${todo._id}`}
                >
                  <i class={"material-icons"}>edit</i>
                </Link>
                <i className={"material-icons"} onClick={() => this.deleteTodo(todo._id)}>delete</i>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Todos;
