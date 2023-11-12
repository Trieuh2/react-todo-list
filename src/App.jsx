
import { useEffect, useState } from "react"
import "./styles.css"
import { NewTodoForm } from "./NewTodoForm"
import { TodoList } from "./TodoList"

// Notes:
//  - JSX only allows us to return ONE element
//     Workaround: <> is a fragment, which allows us to wrap multiple elements without creating unnecessary divs
//  - Hooks CANNOT be rendered conditionally
//      - Can't put them in ifs, loops, returns
//  - Hooks MUST be declared at the top of the component

// [COMPONENT]
export default function App() {
  // [HOOK]
  // Our state's default value is checking our local storage for any items and loading it
  // Default: Empty array
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  // [HOOK]
  // Every time our 'todos' is modified, then this function runs
  // This stores our items as JSON in localStorage
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  // These functions below are used to modify the state of our components (NewTodoForm, TodoList, TodoItem) and are passed as props
  function addTodo(title) {
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ]
    })
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) { 
          return { ...todo, completed }
        }

        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  // [JSX]
  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </>
  )
}