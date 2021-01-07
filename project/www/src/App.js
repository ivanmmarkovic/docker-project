import React from "react";
import "./style.css";
import "./App.css";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Todos from "./Todos";
import TodoUpdate from "./TodoUpdate";



class App extends React.Component {
  constructor() {
    super();
    this.state = { todos: [], loaded: false, url: "/api" };
    this.changeTodoState = this.changeTodoState.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.handleUpdatedTodo = this.handleUpdatedTodo.bind(this);
  }
  changeTodoState(todo) {
    let { todos } = this.state;
    let updatedTodos = todos.map(t => {
      if (t._id == todo._id) {
        t.done = !t.done;
        return t;
      }
      else {
        return t;
      }
    });
    this.setState({
      todos: updatedTodos
    })
  }
  addTodo(todo) {
    let { todos } = this.state;
    let updatedTodos = [...todos, todo];
    setTimeout(() => {
      this.setState({
        todos: updatedTodos
      });
    }, 1000);
  }
  deleteTodo(id) {
    let { todos } = this.state;
    let updatedTodos = todos.filter(t => t._id != id);
    setTimeout(() => {
      this.setState({
        todos: updatedTodos
      });
    }, 1000);
  }
  handleUpdatedTodo(todo) {
    let { todos } = this.state;
    let updatedTodos = todos.map(t => {
      if (t._id != todo._id) {
        return t;
      }
      else {
        return todo;
      }
    });
    setTimeout(() => {
      this.setState({
        todos: updatedTodos
      });
    }, 1000);
  }
  componentDidMount() {
    let { url } = this.state;
    fetch(url)
      .then(res => {
        if (res.status != 200) {
          throw new Error("Error, please try again");
        }
        return res.json();
      })
      .then(data => {
        let todos = data.data;
        this.setState({ loaded: true, todos });
      })
      .catch(err => {
        this.setState({ loaded: true });
        console.log(err);
      });

  }

  render() {
    let { todos, loaded, url } = this.state;
    return (
      <div>
        <nav>
          <Link to={"/"} className={"logo"}> Todo app </Link>
        </nav>

        <Route
          path="/"
          exact={true}
          render={() => <Todos todos={todos} loaded={loaded} url={url} changeTodoState={this.changeTodoState} addTodo={this.addTodo} deleteTodo={this.deleteTodo} />}
        />
        <Route
          path="/:id"
          render={props => (
            <TodoUpdate todo={todos.find(t => t._id == props.match.params.id)} url={url} changeTodoState={this.changeTodoState} handleUpdatedTodo={this.handleUpdatedTodo} />
          )}
        />
      </div>
    );
  }
}

export default App;
