import React, { useState } from "react";
import Todo from "../components/models/todo";

export const TodosContext = React.createContext<{
  items: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
}>({
  items: [],
  addTodo: () => {},
  removeTodo: (id: string) => {},
});

const TodosContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodoHandler = (todoText: string) => {
    const NewTodo = new Todo(todoText);

    setTodos((prevTodos) => {
      return prevTodos.concat(NewTodo);
    });
  };

  const removeTodoHandler = (todoId: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== todoId);
    });
  };

  const contextValue: {
    items: Todo[];
    addTodo: (text: string) => void;
    removeTodo: (id: string) => void;
  } = {
    items: todos,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
