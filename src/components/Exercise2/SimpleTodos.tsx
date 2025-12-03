import { useState } from "react"
import TodosItem from "./TodosItem";

const initialTodosList = [
    {
        id: 1,
        title: 'Book the ticket for today evening',
    },
    {
        id: 2,
        title: 'Rent the movie for tomorrow movie night',
    },
    {
        id: 3,
        title: 'Confirm the slot for the yoga session tomorrow morning',
    },
    {
        id: 4,
        title: 'Drop the parcel at Bloomingdale',
    },
    {
        id: 5,
        title: 'Order fruits on Big Basket',
    },
    {
        id: 6,
        title: 'Fix the production issue',
    },
    {
        id: 7,
        title: 'Confirm my slot for Saturday Night',
    },
    {
        id: 8,
        title: 'Get essentials for Sunday car wash',
    },
]

export default function SimpleTodos() {
    const [todosList, setTodosList] = useState(initialTodosList);

    const deleteTodo = (id: number) => {
        const updatedTodos = todosList.filter(todo => todo.id !== id);
        setTodosList(updatedTodos);
    }

    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 text-white rounded-lg p-6 shadow-lg">
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Simple Todos</h1>
                </div>

                <ul className="mt-6 space-y-3">
                    {todosList.map(todo => (
                        <TodosItem key={todo.id}
                            todoDetails={todo}
                            deleteTodo={deleteTodo} />
                    ))}
                </ul>
            </div>
        </div>
    )
};
