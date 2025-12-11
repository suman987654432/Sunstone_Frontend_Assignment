import { format } from "date-fns";

const TaskCard = ({ task, onEdit, onDelete }) => {
    const { title, description, priority, status, dueDate, createdAt } = task;
    const priorityColor =
        priority === "High"
            ? "bg-red-500"
            : priority === "Medium"
                ? "bg-yellow-500"
                : "bg-green-600";

    return (
        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-300 mb-4">

            <span
                className={`text-white px-2 py-1 text-xs rounded ${priorityColor}`}
            >
                {priority}
            </span>

            <h3 className="text-lg font-semibold mt-2">{title}</h3>
            <p className="text-gray-700 text-sm mt-1">{description}</p>
            <p className="mt-2 text-sm font-medium text-blue-600">
                Status: {status}
            </p>


            <div className="text-sm text-gray-500 mt-2">
                <p>Due: {format(new Date(dueDate), "dd MMM yyyy")}</p>
                <p>Created: {format(new Date(createdAt), "dd MMM yyyy")}</p>
            </div>
            <div className="flex gap-3 mt-2">
                <button className="text-blue-600" onClick={onEdit}>Edit</button>
                <button className="text-red-600" onClick={onDelete}>Delete</button>
            </div>
        </div>
    );
}
export default TaskCard;