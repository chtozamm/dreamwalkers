/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { tw } from "@twind";
import Todo from "./Todo.tsx";

const LOCAL_STORAGE_KEY = "todoApp.todos";

interface Task {
  title: string;
  id: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const titleRef = useRef();

  function addTodo() {
    setTodos(
      (current) => [...current, {
        title: titleRef.current?.value,
        id: globalThis.crypto.randomUUID(),
        completed: false,
      }],
    );
    titleRef.current.value = "";
    titleRef.current.focus();
  }

  function toggleTodo(todo) {
    const newTodos = [...todos];
    // console.log(newTodos)
    // console.log(todo)
    const goal = newTodos.find((t) => t.id === todo.id);
    goal.completed = !goal.completed;
    setTodos(newTodos);
    // console.log(goal)
  }

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <div class={tw`w-[500px] max-w-[500px]`}>
        <div class={tw`flex flex-row gap-0`}>
          <input
            ref={titleRef}
            class={tw`w-full shadow-sm p-1 border(1 gray-200)`}
            type="text"
          />
          <button
            class={tw`ml-3 py-1 px-2 text-black after:(rotate-[360deg] transition-all duration-[1000ms] ease-in-out) active:(after:(rotate-[360deg] transition-all duration-[1000ms] ease-in-out))`}
            onClick={addTodo}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class={tw`h-8 w-8`}
              viewBox="0 0 20 20"
              fill="orange"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        <table class={tw`mt-3 max-w-screen-md`}>
          <tbody>
            {todos.map((todo) => (
              <Todo
                todos={todos}
                todo={todo}
                setTodos={setTodos}
                toggleTodo={toggleTodo}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
