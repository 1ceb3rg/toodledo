import { Todo } from "../models/todo";
import { PlusIcon, XIcon } from "@heroicons/react/outline";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from "react-icons/md";
import { FormEvent, memo, useEffect, useRef, useState } from "react";
import { useTodos } from "../hooks/TodoContext";
import Button from "./Button";
interface TodoProps {
  todo: Todo;
}
function TodoItem(props: TodoProps) {
  const { todo } = props;
  const [editing, setEditing] = useState(false);

  const todoInput = useRef<HTMLInputElement>(null);
  const { setTodoList } = useTodos();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editing) {
      setEditing(false);
      console.log(e.currentTarget);
      setTodoList({
        type: "EDIT_TODO",
        payload: { index: todo.index, item: todoInput.current?.value ?? "" },
      });
    } else setEditing(true);
  };

  const handleDelete = () => {
    console.log(`Deleting ${todo.index}`);
    setTodoList({ type: "DELETE_TODO", payload: { index: todo.index } });
  };
  const handleAddTodo = () => {
    setTodoList({ type: "ADD_TODO", payload: { index: todo.index } });
  };
  const handleCheckBox = () => {
    setTodoList({ type: "TOGGLE_TODO", payload: { index: todo.index } });
  };

  useEffect(() => {
    editing && todoInput.current?.focus();
  }, [editing]);
  return (
    <div
      className={`md:pl-2 py-2 first:mt-2 ml-2  last:mb-2 flex  flex-col   `}
    >
      <div className="flex gap-2 pl-1 py-1 md:pl-2 h-16 align-middle ">
        <div
          className={`flex bg-[#E84DB7] rounded-lg h-fit w-fit  ${
            todo.index.length > 3 && "hidden"
          }`}
        >
          <Button
            title="Add Todo"
            className="md:h-6 md:w-6 h-3 w-3 flex"
            onClick={handleAddTodo}
          >
            <PlusIcon className="md:h-6 md:w-6 h-3 w-3 " />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="w-full h-fit">
          <label htmlFor="toInput" className="sr-only">
            Input your todo item
          </label>
          <input
            pattern="(.*[^\s].*){0,50}"
            required={true}
            onBlur={() => setEditing(false)}
            onDoubleClick={() => setEditing(true)}
            onTouchEnd={() => setEditing(true)}
            onTouchMove={() => setEditing(false)}
            id="todoInput"
            placeholder="What do you need todo?"
            ref={todoInput}
            className={` m-1 md:text-xl read-only:bg-transparent read-only:placeholder:text-gray-100  read-only:text-white read-only:border-0 w-full text-black ${
              todo.completed && "line-through"
            } invalid:ring-red-600 `}
            type="text"
            defaultValue={todo.item}
            readOnly={!editing}
          />
        </form>
        <div className="flex bg-[#E84DB7] rounded-lg h-fit w-fit  ">
          <Button
            title={todo.completed ? "Mark Incomplete" : "Mark Done"}
            onClick={handleCheckBox}
          >
            {todo.completed ? (
              <MdOutlineCheckBox className="md:h-6 md:w-6 h-3 w-3 " />
            ) : (
              <MdOutlineCheckBoxOutlineBlank className="md:h-6 md:w-6 h-3 w-3 " />
            )}
          </Button>

          <Button
            title="Delete Todo"
            className="md:h-6 md:w-6 h-4 w-3 flex"
            onClick={handleDelete}
          >
            <XIcon className="md:h-6 md:w-6 h-3 w-3" />
          </Button>
        </div>
      </div>
      <div
        className={`empty:hidden  mt-4 border-l-2  peer-first:rounded-t-xl last:rounded-b-xl ${
          todo.index.length % 2 !== 0 ? "border-[#E84DB7]" : "border-[#27ECF9]"
        }`}
      >
        {todo.todos.map((todoItem, index) => (
          <TodoItem
            key={
              todo.index.reduce((arr, curr) => arr + curr.toString(), "") +
              index.toString()
            }
            todo={{
              ...todoItem,
              completed: todo.completed ? true : todoItem.completed,
              index: todo?.index ? [...todo.index, index] : [index],
            }}
          />
        ))}
      </div>
    </div>
  );
}
export default memo(TodoItem);
