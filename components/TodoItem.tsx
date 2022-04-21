import { Todo } from "../models/todo";
import { ArrowDownIcon, PlusIcon, XIcon } from "@heroicons/react/outline";
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
  useEffect(() => {
    //@ts-ignore
    let input = todoInput.current;
    if (input?.value) input.value = todo.item;
  }, [todo.item]);
  const handleDelete = () => {
    console.log(`Deleting ${todo}`);
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
    <li
      aria-label="Todo Item"
      className={`md:pl-2 py-2 first:mt-2 ml-2 md:ml-4  last:mb-2 flex  flex-col   `}
    >
      <div
        className={` ${
          todo.index.length % 2 !== 0 ? "border-[#E84DB7]" : "border-[#27ECF9]"
        } ${
          todo.todos.length > 0 && "border-l-2 border-t-2 rounded-tl-xl"
        } flex gap-2 pl-1 py-1 md:pl-2 h-16 align-middle `}
      >
        <form
          aria-label="Edit Todo"
          onSubmit={handleSubmit}
          className="w-full h-fit"
        >
          <label htmlFor="todoInput" className="sr-only">
            Input your todo item
          </label>
          <input
            pattern="(.*[^\s].*){0,50}"
            required={true}
            onBlur={() => setEditing(false)}
            onTouchEnd={() => setEditing(true)}
            onDoubleClick={() => setEditing(true)}
            id="todoInput"
            placeholder="What do you need todo?"
            ref={todoInput}
            className={` m-1 md:text-xl read-only:bg-transparent placeholder:text-gray-700 read-only:placeholder:text-gray-400   read-only:text-white read-only:border-0 w-full text-black ${
              todo.completed && "line-through"
            } invalid:ring-red-600 `}
            type="text"
            defaultValue={todo.item}
            readOnly={!editing}
          />
        </form>
        <div className="flex bg-[#E84DB7] rounded-lg h-fit w-fit  ">
          <Button
            aria-label={
              todo.completed
                ? "This todo has been completed, click to mark this todo as incomplete"
                : "This todo is incomplete, click to mark this todo as completed"
            }
            title={todo.completed ? "Mark Incomplete" : "Mark Done"}
            onClick={handleCheckBox}
          >
            {todo.completed ? (
              <MdOutlineCheckBox className="md:h-6 md:w-6 h-4 w-4 " />
            ) : (
              <MdOutlineCheckBoxOutlineBlank className="md:h-6 md:w-6 h-4 w-4 " />
            )}
          </Button>

          <Button
            aria-label="Delete this todo"
            title="Delete Todo"
            className="md:h-6 md:w-6 h-4 w-3 flex"
            onClick={handleDelete}
          >
            <XIcon className="md:h-6 md:w-6 h-4 w-4" />
          </Button>
          {todo.todos.length === 0 && todo.index.length < 5 && (
            <Button
              aria-label="Create a sublist of todos for this todo"
              title="Create Sublist"
              className="md:h-6 md:w-6 h-4 w-4 flex"
              onClick={handleAddTodo}
            >
              <ArrowDownIcon className="md:h-6 md:w-6 h-4 w-4 " />
            </Button>
          )}
        </div>
      </div>
      {todo.todos.length > 0 && (
        <ol
          aria-label={`Sublist of todos for ${todo.item}`}
          className={`empty:hidden   border-l-2 border-b-2  peer-first:rounded-t-xl last:rounded-bl-xl ${
            todo.index.length % 2 !== 0
              ? "border-[#E84DB7]"
              : "border-[#27ECF9]"
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
          <div className="w-full flex justify-end">
            <div
              className={`flex ml-2 mb-2 ${
                todo.index.length % 2 !== 0 ? "bg-[#E84DB7]" : "bg-[#27ECF9]"
              } rounded-lg h-fit w-fit  ${todo.index.length > 3 && "hidden"}`}
            >
              <Button
                title="Add Todo"
                aria-label={`Add a todo to the list ${todo.item}`}
                className="md:h-6 md:w-6 h-4 w-4 flex"
                onClick={handleAddTodo}
              >
                <PlusIcon className="md:h-6 md:w-6 h-4 w-4 " />
              </Button>
            </div>
          </div>
        </ol>
      )}
    </li>
  );
}
export default memo(TodoItem);
