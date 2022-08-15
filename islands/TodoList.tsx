/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact"
import { useRef, useState, useEffect } from "preact/hooks"
import { tw } from "@twind"
import Todo from "./Todo.tsx"

const LOCAL_STORAGE_KEY = "todoApp.todos" 

interface Task {
  title: string
  id: string
  completed: boolean
}

// const task = new Task()

export default function TodoList() {

  const [todos, setTodos] = useState([])
  const titleRef = useRef()

  function addTodo() {
    setTodos(current => [...current, {title: titleRef.current?.value, id: globalThis.crypto.randomUUID(), completed: false}])
  }

  function toggleTodo(todo) {
    const newTodos = [...todos]
    // console.log(newTodos)
    // console.log(todo)
    const goal = newTodos.find(t => t.id === todo.id)
    goal.completed = !goal.completed
    setTodos(newTodos)
    // console.log(goal)
}


  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])



  return (
    <>
    <div class={tw`max-w-screen-md`}>
      <input ref={titleRef} class={tw`shadow-sm p-1`} type="text" />
      <button class={tw`ml-3 py-1 px-2 border(1 gray-200)`} onClick={addTodo}>Add</button>
      <ul class={tw`mt-1 max-w-screen-md children:(p-2)`}>
        {todos.map(todo => (
        <Todo todos={todos} todo={todo} setTodos={setTodos} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </div>
    </>
  )
}