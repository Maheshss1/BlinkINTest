import React from "react";
import "./Todo.css";
//import Item from '../../component/Item/Item'

class Todo extends React.Component {
  state = {
    todoList: JSON.parse(localStorage.getItem("todoList")) || [],
    inputValue: "",
    sorted: false
  };

  changeInput = event => {
    this.setState({
      inputValue: event.target.value
    });
  };

  handleForm = (e, todoList) => {
    //e.preventDefault();
    if (this.state.inputValue.trim().length === 0) return;
    //const todoList = [...this.state.todoList];
    todoList.push({
      key: Date.now(),
      todo: this.state.inputValue,
      marked: false
    });
    localStorage.setItem("todoList", JSON.stringify(todoList));
    this.setState({
      todoList: todoList,
      inputValue: ""
    });
  };

  markCompleted = (todo, newList) => {
    //const newList = [...this.state.todoList];
    const list = newList.map(t => {
      if (todo.key === t.key) {
        t.marked = true;
      }
      return t;
    });
    localStorage.setItem("todoList", JSON.stringify(list));

    this.setState({
      todoList: list
    });
  };

  sortTodoList = (sorted, newList) => {
    //const sorted = this.state.sorted;
    //let newList = [...this.state.todoList];
    if (sorted) {
      newList = newList.sort((a, b) => {
        if (a.todo < b.todo) return -1;
        else if (a.todo > b.todo) return 1;
        return 0;
      });
      console.log(newList);
    } else {
      newList = newList.sort((a, b) => {
        if (a.todo > b.todo) return -1;
        else if (a.todo < b.todo) return 1;
        return 0;
      });
    }
    localStorage.setItem("todoList", JSON.stringify(newList));
    console.log(sorted, newList);

    this.setState(prevState => {
      return {
        sorted: !prevState.sorted,
        todoList: newList
      };
    });
  };

  render() {
    const list = this.state.todoList.map(todo => {
      return (
        <li
          key={todo.key}
          style={{
            cursor: "pointer",
            listStyle: "none"
          }}
          className={todo.marked ? "Marked" : null}
          onClick={() => this.markCompleted(todo, [...this.state.todoList])}
        >
          {todo.todo}
        </li>
      );
    });

    return (
      <div>
        <form onSubmit={e => this.handleForm(e, [...this.state.todoList])}>
          <input
            data-testid="inputTodo"
            type="text"
            value={this.state.inputValue}
            onChange={e => {
              this.changeInput(e);
            }}
          />
          <input type="submit" />
        </form>
        <button
          data-testid="submitBtn"
          onClick={() => {
            this.sortTodoList(this.state.sorted, [...this.state.todoList]);
          }}
        >
          {this.state.sorted ? "Asc" : "Desc"}
        </button>
        <ul>{list}</ul>
      </div>
    );
  }
}

export default Todo;
