import React, { useState } from "react";
import TodoForm from "./TodoForm";

const Todo = ({ todos, removeTodo, updateTodo }) => {
	const [edit, setEdit] = useState({
		id: null,
		value: "",
	});

	const submitUpdate = (value) => {
		updateTodo(edit.id, value);
		setEdit({
			id: null,
			value: "",
		});
	};

	if (edit.id) {
		return <TodoForm edit={edit} onSubmit={submitUpdate} />;
	}

	return todos.map((todo, index) => (
		<div key={index} style={{ display: "flex", padding: "10px" }}>
			<div>{todo.text}</div>
			<div style={{ marginLeft: "24px" }}>
				<button
					onClick={() => removeTodo(todo.id)}
					style={{ marginRight: "12px" }}
				>
					Delete
				</button>
				<button onClick={() => setEdit({ id: todo.id, value: todo.text })}>
					{" "}
					Edit
				</button>
			</div>
		</div>
	));
};
export default Todo;
