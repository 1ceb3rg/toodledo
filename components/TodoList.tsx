import { PlusIcon } from "@heroicons/react/outline";
import { memo } from "react";
import { useTodos } from "../hooks/TodoContext";
import Button from "./Button";
import TodoItem from "./TodoItem";

function TodoList() {
  const { todoList, setTodoList } = useTodos();
  const handleAddTodo = () => {
    setTodoList({ type: "ADD_TODO", payload: { index: [] } });
  };
  return (
    <div className="max-w-3xl min-w-fit pr-2 md:pr-4 rounded-lg mx-auto border-4 border-[#27ECF9]">
      <ol className="">
        {todoList.map((todo, index) => (
          <TodoItem
            key={index.toString()}
            todo={{
              ...todo,
              index: todo?.index ? [...todo.index, index] : [index],
            }}
          ></TodoItem>
        ))}
      </ol>
      <div className="w-full flex justify-end">
        <div
          className={`flex ml-2 my-2 ${"bg-[#27ECF9]"} rounded-lg h-fit w-fit  `}
        >
          <Button
            title="Add Todo"
            className="md:h-6 md:w-6 h-3 w-3 flex"
            onClick={handleAddTodo}
          >
            <PlusIcon className="md:h-6 md:w-6 h-3 w-3 " />
          </Button>
        </div>
      </div>
    </div>
  );
}
export default TodoList;
