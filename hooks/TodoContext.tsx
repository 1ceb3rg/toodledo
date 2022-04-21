import produce from "immer";
import React, {
  Dispatch,
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
  memo,
  useCallback,
} from "react";
import { Todo } from "../models/todo";

//Navigate throught the todos
const navTodo = (todo: Todo, index: Array<number>): Todo => {
  if (index.length === 0) return todo;
  if (index.length === 1) return todo.todos[index[0]];
  return navTodo(todo.todos[index[0]], index.slice(1));
};

// Todo Reducer Actions
type Action =
  | { type: "ADD_TODO"; payload: { index: Array<number> } }
  | { type: "TOGGLE_TODO"; payload: { index: Array<number> } }
  | { type: "EDIT_TODO"; payload: { index: Array<number>; item: string } }
  | { type: "DELETE_TODO"; payload: { index: Array<number> } };

const todoReducer = produce((draft: Array<Todo>, action: Action) => {
  const t0 = performance.now();
  switch (action.type) {
    case "ADD_TODO":
      {
        if (action.payload.index.length === 0) {
          draft.push({
            completed: false,
            item: "",
            todos: [],
            index: action.payload.index,
          });
        } else {
          let todo = navTodo(
            draft[action.payload.index[0]],
            action.payload.index.slice(1)
          );
          todo.todos.push({
            completed: false,
            item: "",
            todos: [],
            index: action.payload.index,
          });
        }
      }
      break;
    case "TOGGLE_TODO":
      {
        let todo = navTodo(
          draft[action.payload.index[0]],
          action.payload.index.slice(1)
        );
        todo.completed = !todo.completed;
      }
      break;
    case "EDIT_TODO":
      {
        let todo = navTodo(
          draft[action.payload.index[0]],
          action.payload.index.slice(1)
        );
        todo.item = action.payload.item;
      }
      break;
    case "DELETE_TODO":
      {
        console.log(action.payload.index);
        if (action.payload.index.length === 1) {
          draft.splice(action.payload.index[0], 1);
        } else {
          let todo = navTodo(
            draft[action.payload.index[0]],
            action.payload.index.slice(1, action.payload.index.length - 1)
          );

          todo.todos.splice(
            action.payload.index[action.payload.index.length - 1],
            1
          );
        }
      }
      break;
  }
  const t1 = performance.now();
  console.log(`Call to reducer took took ${t1 - t0} milliseconds.`);
});
interface ITodoContext {
  todoList: Array<Todo>;
  setTodoList: Dispatch<Action>;
}
// TodoContext Provider
const TodoContext = createContext({} as ITodoContext);
export const TodoContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [todoList, setTodoList] = useReducer(
    todoReducer,
    localStorage.getItem("todo-list")
      ? JSON.parse(localStorage.getItem("todo-list") ?? "")
      : ([{ completed: false, item: "", todos: [], index: [] }] as Array<Todo>)
  );

  const updateTodoList = (action: Action) => {
    setTodoList(action);
  };
  useEffect(() => {
    const t0 = performance.now();
    localStorage.setItem("todo-list", JSON.stringify(todoList));

    const t1 = performance.now();
    console.log(`Call to local storage took took ${t1 - t0} milliseconds.`);
  }, [todoList]);

  return (
    <TodoContext.Provider value={{ todoList, setTodoList: updateTodoList }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = (): ITodoContext => {
  const { todoList, setTodoList } = useContext(TodoContext);
  return { todoList, setTodoList };
};
