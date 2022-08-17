/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { useRef, useState } from "preact/hooks";
import { tw } from "@twind";
import { css } from "twind/css";

interface Task {
  title: string;
  id: string;
  completed: boolean;
}

// const task = new Task()

export default function TodoList({ todos, todo, setTodos, toggleTodo }) {
  function deleteTodo() {
    setTodos((current) => current.filter((t) => todo.id !== t.id));
  }

  function handleToggle() {
    toggleTodo(todo);
  }
  // class={tw`mr-3 scale-125`}
  return (
    <>
      <tr class={tw`children:font-normal text-left`}>
        <th>
          <input
            class={tw(
              css({
                "accent-color": "orange",
                "margin-right": "1rem",
                "scale": "125%",
              }),
            )}
            type="checkBox"
            checked={todo.completed ? true : false}
            onChange={handleToggle}
          />
        </th>
        <th
          class={tw`${
            todo.completed
              ? "line-through text-gray-400 transition-all ease-linear border-b(2 gray-200)"
              : "transition-all ease-linear border-b(2 gray-200)"
          }`}
        >
          {todo.title}
        </th>
        <th>
          <button
            class={tw`ml-3 py-1 px-2 text-black border(1 gray-200) hover:(bg-red-500 text-white transition-all ease-liner)`}
            onClick={deleteTodo}
          >
            Delete
          </button>
        </th>
      </tr>
    </>
  );
}
