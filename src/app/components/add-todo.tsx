'use client'

import { useTodos } from '@/app/store/todos'
import React, { FormEvent, useState } from 'react'


function AddTodo() {

    const [todo, setTodo] = useState('')
    
    const {handleAddTodo} = useTodos()

    function handleFormSubmit (e:FormEvent<HTMLFormElement>) {
        setTodo('')
        e.preventDefault()
        handleAddTodo(todo)
    }

    return (
        <div>
            <form action="" onSubmit={handleFormSubmit}> 
        <input onChange={(a) => setTodo(a.target.value)} value={todo} className="rounded-sm mb-5 w-65 outline-none border border-gray-300 p-1" type="text" placeholder='Start any task....' />
        <button className="ml-2 rounded-md bg-emerald-500  px-4 py-1 text-white" type="submit">Add</button>
        </form>
        </div>
    )
}

export default AddTodo
