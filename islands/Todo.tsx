/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact"
import { useRef, useState } from "preact/hooks"
import { tw } from "@twind"


interface Task {
  title: string
  id: string
  completed: boolean
}

// const task = new Task()

export default function TodoList({todos, todo, setTodos, toggleTodo}) {
    
    function deleteTodo() {
        setTodos(current => current.filter(t => todo.id !== t.id))
    }
    
    function handleToggle() {
        toggleTodo(todo)
    }

    return (
        <li>
            <input class={tw`mr-3 scale-125`} type="checkBox" checked={todo.completed ? true : false} onChange={handleToggle} />
            {todo.title}
            <button class={tw`ml-3 py-1 px-2 border(1 gray-200)`} onClick={deleteTodo}>Delete</button>
        </li>
  )
}