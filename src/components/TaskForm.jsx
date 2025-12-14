import { useState, useEffect } from "react";
const TaskForm = ({ editingTask, onSave }) => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        priority: "Low",
        status: "To-Do",
        dueDate: "",
    });

    useEffect(() => {
        if (editingTask) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setInput(editingTask);
        }
    }, [editingTask]);

    //handle input chnage
    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    };


    //handle form submit
    const handleSubmit = () => {
        if (!input.title || !input.description || !input.dueDate) {
            alert("Please fill all fields");
            return;
        }

        const saved = JSON.parse(localStorage.getItem("tasks")) || [];
        if (editingTask) {
            const updated = saved.map((task) =>
                task.id === editingTask.id ? { ...input } : task
            );
            // Save updated tasks 
            localStorage.setItem("tasks", JSON.stringify(updated));
            alert("Task Updated");
            onSave();
            return;
        }

        // Create new task
        const newTask = {
            ...input,
            id: Date.now(),
            createdAt: new Date().toISOString(),
        };
        const updated = [...saved, newTask];
        localStorage.setItem("tasks", JSON.stringify(updated));
        alert("Task Added!");
        onSave();
    };



    

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-[600px] max-h-[700px] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    {editingTask ? "Edit Task" : "Add New Task"}
                </h2>

                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="border p-2 w-full mb-3 rounded placeholder-gray-900
"
                    value={input.title}
                    onChange={handleInput}
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    className="border p-2 w-full mb-3 rounded min-h-[100px] placeholder-gray-900
"
                    value={input.description}
                    onChange={handleInput}
                ></textarea>

                <label className="text-gray-700 font-medium"> Select Priority</label>
                <select
                    name="priority"
                    className="border p-2 w-full mb-3 rounded"
                    value={input.priority}
                    onChange={handleInput}
                >

                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>


                <label className="text-gray-700 font-medium"> Select Status</label>
                <select
                    name="status"
                    className="border p-2 w-full mb-3 rounded"
                    value={input.status}
                    onChange={handleInput}
                >
                    <option value="To-Do">To-Do</option>
                    <option value="In-Progress">In-Progress</option>
                    <option value="Completed">Completed</option>
                </select>

                <input
                    type="date"
                    name="dueDate"
                    className="border p-2 w-full mb-4 rounded"
                    value={input.dueDate}
                    onChange={handleInput}
                />
                <div className="flex justify gap-10 mt-4">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={onSave}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={handleSubmit}
                    >
                        {editingTask ? "Update Task" : "Add Task"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskForm;
