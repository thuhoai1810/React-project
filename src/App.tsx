import React from "react";
import TodoForm from "./pages/TodoForm";
import TodoList from "./pages/TodoList";
import Todo from "./pages/Todo";

function App() {
	return (
		<div className='todo-app'>
			{/* <TodoList /> */}
			<TodoForm />
		</div>
	);
}

export default App;
