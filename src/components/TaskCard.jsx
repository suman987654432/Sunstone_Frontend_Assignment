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
    <div className="bg-white shadow rounded-xl p-5 border border-gray-200 hover:shadow-[0_6px_25px_rgba(0,0,0,0.15)] transition-all duration-300">

      {/* Header */}
      <div className="flex items-center justify-between">
        <span className={`text-white px-3 py-1 text-xs rounded-full ${priorityColor}`}>
          {priority}
        </span>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            status === "Completed"
              ? "bg-green-100 text-green-600"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold mt-3 text-gray-900">{title}</h3>

      {/* Description */}
      <p className="text-gray-600 text-sm mt-2 leading-relaxed">
        {description}
      </p>

      {/* Dates */}
      <div className="mt-4 bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
        <p className="flex justify-between">
          <span>Due Date:</span>
          <span>{format(new Date(dueDate), "dd MMM yyyy")}</span>
        </p>
        <p className="flex justify-between mt-1">
          <span>Created:</span>
          <span>{format(new Date(createdAt), "dd MMM yyyy")}</span>
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-4">
        <button
          className="px-3 py-1 text-sm font-medium rounded-lg text-blue-600 border border-blue-500 hover:bg-blue-50 transition"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="px-3 py-1 text-sm font-medium rounded-lg text-red-600 border border-red-500 hover:bg-red-50 transition"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
