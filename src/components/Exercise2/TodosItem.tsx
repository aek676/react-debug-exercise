interface TodosItemProps {
    todoDetails: {
        id: number;
        title: string;
    },
    deleteTodo: (id: number) => void
}

export default function TodosItem({ todoDetails, deleteTodo }: TodosItemProps) {
    const { id, title } = todoDetails;

    const onDeleteTodo = () => {
        deleteTodo(id);
    }

    return (
        <li className="flex items-center justify-between gap-4 p-4 bg-white border border-slate-200/70 rounded-md shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-semibold">{id}</div>
                <p className="text-slate-800 text-sm sm:text-base">{title}</p>
            </div>
            <button
                onClick={onDeleteTodo}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md shadow-sm transition-colors"
            >
                Delete
            </button>
        </li>
    );

};
