import { TodoItem } from "./TodoItem"

// [COMPONENT]
export function TodoList({ todos, toggleTodo, deleteTodo }) {
  // [JSX]
  return (
    <ul className="list">
      {todos.length === 0 && "No Todos"}
      {todos.map(todo => {
        return (
          <TodoItem
            {...todo}
            key={todo.id}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        )
      })}
    </ul>
  )
}