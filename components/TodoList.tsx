import { memo } from "react";
import { useTodos } from "../hooks/TodoContext";
import TodoItem from "./TodoItem";

function TodoList() {
  const { todoList } = useTodos();

  return (
    <div className="max-w-3xl min-w-fit pr-2 md:pr-4 rounded-lg mx-auto border-4 border-[#27ECF9] ">
      {todoList.map((todo, index) => (
        <TodoItem
          key={index.toString()}
          todo={{
            ...todo,
            index: todo?.index ? [...todo.index, index] : [index],
          }}
        ></TodoItem>
      ))}
    </div>
  );
}
export default memo(TodoList);
