'use client'

import { Todo, useTodos } from "@/app/store/todos"

// import React from 'react'


function Todos() {

    const {todos, toggleTodoAsCompleted, handleDeleteTodo} = useTodos()
    console.log(todos);

    const todosFilter = todos;
    
    return (
        <div>
            <ul>
                {todosFilter.map((todo:Todo) => (
                    <li key={todo.id} className="border-b-2 border-gray-300 p-1 w-85 h-10 flex justify-between">
                        
                        <input className="m-1 h-5 w-5" type="checkbox" name="" id={`todo-${todo.id}`} checked={todo.completed} onChange={() => toggleTodoAsCompleted(todo.id)} />

                        <label className={`p-1 w-60 ${todo.completed ? 'line-through' : ''}`} htmlFor={`todo-${todo.id}`} >{todo.task}</label>

                        {
                            todo.completed && (
                                <button className="flex justify-center rounded-sm text-white bg-red-700 p-0.5 w-15 h-7" type="button" onClick={() => handleDeleteTodo(todo.id)} >Delete
                                </button>
                            )
                        }
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Todos
