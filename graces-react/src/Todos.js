import React from 'react'

const Todos = ({todos, deleteTodo}) => {
    const todoList = todos.length ? (
        todos.map(todo => {
            return (
                <div className="center collection-item" key={todo.id} onClick={() => {deleteTodo(todo.id)}}>
                    <span className="blue-text text-darken-2">{todo.content}</span>
                </div>
            )
        })
    ) : (
        <p className="center">You have no todo's left, yay!</p>
    )
    return (
        <div className="todos collection">
            {todoList}
        </div>
    )
}

export default Todos

