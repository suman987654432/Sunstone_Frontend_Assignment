const Navbar = ({ onAddTask, onFilter, onSort }) => {
  return (
    <nav className="flex flex-col md:flex-row items-center justify-between gap-3 px-4 md:px-6 py-3 bg-gray-200 border-b border-gray-300 sticky top-0 z-10">
      <h2 className="text-xl font-semibold">Task Manager</h2>
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">

        <select
          className="px-2 md:px-3 py-1 text-sm md:text-base border border-gray-400 rounded-md"
          onChange={(e) => onFilter("priority", e.target.value)}
        >
          <option value="">Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="date"
          className="px-2 md:px-3 py-1 text-sm md:text-base border border-gray-400 rounded-md"
          onChange={(e) => onFilter("dueDate", e.target.value)}
        />


        <select
          className="px-2 md:px-3 py-1 text-sm md:text-base border border-gray-400 rounded-md"
          onChange={(e) => onFilter("status", e.target.value)}
        >
          <option value="">Status</option>
          <option value="To-Do">To-Do</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Completed">Completed</option>
        </select>


        <select
          className="px-2 md:px-3 py-1 text-sm md:text-base border border-gray-400 rounded-md"
          onChange={(e) => onSort(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="oldest">Oldest First</option>
          <option value="newest">Newest First</option>
          <option value="closest">Closest Due Date</option>
        </select>

      </div>

      {/* Add Button */}
      <button
        onClick={onAddTask}
        className="px-4 py-2 text-sm md:text-base bg-blue-600 text-white rounded-md hover:bg-blue-700 whitespace-nowrap"
      >
        Add Task
      </button>
    </nav>
  );
};

export default Navbar;
