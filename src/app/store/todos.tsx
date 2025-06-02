'use client'

import { ReactNode, createContext, useContext, useState, useEffect } from 'react'

export type Todo = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}

export type TodosContext = {
    todos: Todo[];
    handleAddTodo: (task: string) => void;
    toggleTodoAsCompleted: (id: string) => void;
    handleDeleteTodo: (id: string) => void;
}

export const todosContext = createContext<TodosContext | null>(null);

export function TodosProvider({ children }: { children: ReactNode }) {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedTodos = localStorage.getItem('todos');
            if (storedTodos) {
                setTodos(JSON.parse(storedTodos) as Todo[]);
            }
        }
    }, []);

    const handleAddTodo = (task: string): void => {
        setTodos((prev) => {
            const newTodos: Todo[] = [
                {
                    id: Math.random().toString(),
                    task,
                    completed: false,
                    createdAt: new Date()
                },
                ...prev,
            ];

            if (typeof window !== 'undefined') {
                localStorage.setItem('todos', JSON.stringify(newTodos));
            }
            return newTodos;
        });
    };

    const toggleTodoAsCompleted = (id: string): void => {
        setTodos((prev) => {
            const newTodos = prev.map((task) => {
                if (task.id === id) {
                    return {
                        ...task, completed: !task.completed };
                }
                return task;
            });
            if (typeof window !== 'undefined') {
                localStorage.setItem('todos', JSON.stringify(newTodos));
            }
            return newTodos;
        });
    };

    const handleDeleteTodo = (id: string): void => {
        setTodos((prev) => {
            const newTodos = prev.filter((task) => task.id !== id);
            if (typeof window !== 'undefined') {
                localStorage.setItem('todos', JSON.stringify(newTodos));
            }
            return newTodos;
        });
    };

    return (
        <todosContext.Provider value={{ todos, handleAddTodo, toggleTodoAsCompleted, handleDeleteTodo }}>
            {children}
        </todosContext.Provider>
    );
}

export function useTodos() {
    const todosContextValue = useContext(todosContext);
    if (!todosContextValue) {
        throw new Error('useTodos must be used within a TodosProvider');
    }
    return todosContextValue;
}