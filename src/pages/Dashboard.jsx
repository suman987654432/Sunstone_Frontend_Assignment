/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import TaskCard from '../components/TaskCard.jsx';
import TaskForm from '../components/TaskForm.jsx';
import Task from "../components/Task.json";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    priority: "",
    dueDate: "",
    status: "",
  });
  const [sortBy, setSortBy] = useState("");


  // load tasks from local storage
  const loadTasks = () => {
    let saved = JSON.parse(localStorage.getItem("tasks"));

    if (!saved || saved.length === 0) {
      saved = Task;
      localStorage.setItem("tasks", JSON.stringify(saved));
    }
    setTasks(saved);
  };

  useEffect(() => {
    loadTasks();
  }, []);


  //delete task
  const deleteTask = (id) => {
    const filtered = tasks.filter((s) => s.id !== id);
    localStorage.setItem("tasks", JSON.stringify(filtered));
    setTasks(filtered);
  }


  //drag and drop handle
  const handleDrag = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;
    const updatedTasks = [...tasks];
    const draggedTask = updatedTasks.find(t => t.id === Number(draggableId));
    draggedTask.status = destination.droppableId;
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  }


  // sort and filter logic 
  const TaskProcess = () => {
    let result = [...tasks];

    if (filters.priority) {
      result = result.filter((t) => t.priority === filters.priority);
    }


    if (filters.status) {
      result = result.filter((t) => t.status === filters.status);
    }


    if (filters.dueDate) {
      result = result.filter(
        (t) => t.dueDate.slice(0, 10) === filters.dueDate
      );
    }

    // Sorting
    if (sortBy === "oldest") {
      result.sort((first, second) =>
        new Date(first.createdAt) - new Date(second.createdAt)
      );
    }

    if (sortBy === "newest") {
      result.sort((first, second) =>
        new Date(second.createdAt) - new Date(first.createdAt)
      );
    }

    if (sortBy === "closest") {
      result.sort(
        (first, second) => new Date(first.dueDate) - new Date(second.dueDate)
      );
    }

    return result;
  };


  

  return (
    <>
      <Navbar onAddTask={() => setShowForm(true)}
        onFilter={(type, value) =>
          setFilters((prev) => ({ ...prev, [type]: value }))
        }
        onSort={(value) => setSortBy(value)}
        onReset={() => {
          setFilters({ priority: "", dueDate: "", status: "" });
          setSortBy("");
        }} />
      {showForm && (
        <TaskForm
          editingTask={editingTask}
          onSave={() => {
            setShowForm(false);
            setEditingTask(null);
            loadTasks();
          }}
        />)}

        
      <DragDropContext onDragEnd={handleDrag}>
        <div className="  flex flex-col lg:flex-row gap-3 md:gap-5 p-3 md:p-5 ">
          {/* To-Do Column */}
          <Droppable droppableId="To-Do">
            {(p) => (
              <div
                className="w-full lg:w-1/3 bg-gray-100 p-3 md:p-4 rounded-lg shadow-sm border border-gray-300 h-[60vh] md:h-[75vh] lg:h-[87vh] overflow-y-auto"
                ref={p.innerRef}
                {...p.droppableProps}
              >
                <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-center">To-Do</h3>

                {TaskProcess().filter((t) => t.status === "To-Do")
                  .map((task, index) => (
                    <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                      {(p) => (
                        <div
                          ref={p.innerRef}
                          {...p.draggableProps}
                          {...p.dragHandleProps}
                        >
                          <TaskCard
                            task={task}
                            onEdit={() => {
                              setEditingTask(task);
                              setShowForm(true);
                            }}
                            onDelete={() => deleteTask(task.id)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}

                {p.placeholder}
              </div>
            )}
          </Droppable>




          {/* In-Progress Column */}

          <Droppable droppableId="In-Progress">
            {(p) => (
              <div
                className="w-full lg:w-1/3 bg-gray-100 p-3 md:p-4 rounded-lg shadow-sm border border-gray-300 h-[60vh] md:h-[75vh] lg:h-[87vh] overflow-y-auto"
                ref={p.innerRef}
                {...p.droppableProps}
              >

                <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-center">In-Progress</h3>
                {TaskProcess().filter((t) => t.status === "In-Progress")
                  .map((task, index) => (
                    <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                      {(p) => (
                        <div
                          ref={p.innerRef}
                          {...p.draggableProps}
                          {...p.dragHandleProps}
                        >
                          <TaskCard
                            task={task}
                            onEdit={() => {
                              setEditingTask(task);
                              setShowForm(true);
                            }}
                            onDelete={() => deleteTask(task.id)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                {p.placeholder}
              </div>
            )}
          </Droppable>




          {/* Completed Column */}

          <Droppable droppableId="Completed">
            {(p) => (
              <div
                className="w-full lg:w-1/3 bg-gray-100 p-3 md:p-4 rounded-lg shadow-sm border border-gray-300 h-[60vh] md:h-[75vh] lg:h-[87vh] overflow-y-auto"
                ref={p.innerRef}
                {...p.droppableProps}
              >

                <h3 className="text-base md:text-lg font-semibold mb-2 md:md-3 text-center">Completed</h3>
                {TaskProcess().filter((t) => t.status === "Completed")
                  .map((task, index) => (
                    <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                      {(p) => (
                        <div
                          ref={p.innerRef}
                          {...p.draggableProps}
                          {...p.dragHandleProps}
                        >
                          <TaskCard
                            task={task}
                            onEdit={() => {
                              setEditingTask(task);
                              setShowForm(true);
                            }}
                            onDelete={() => deleteTask(task.id)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                {p.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );
};

export default Dashboard;
