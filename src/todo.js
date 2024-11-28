import React, {Component} from 'react';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      name: ''
    };
  }

  onInput = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  addTodo = () => {
    const {todos, name} = this.state;
    this.setState({
      todos: [...todos, name]
    });
  }
  
  render() {
    const { todos } = this.state;

    return (
      <div>
        <input type="text" onInput={this.onInput} />
        <button>Add ToDo</button>
        <ul>
          { todos.map((todo, index) => <li key={index}>{todo}</li>) }
        </ul>
      </div>
    );
  }
}
