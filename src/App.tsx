import { useState, useEffect } from "react";
import "./App.css";

interface Task {
  id: number;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
}

const TASKS_KEY = "tasks";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(TASKS_KEY) || "[]") as Task[];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (): void => {
    if (!title.trim()) return;
    const newTask: Task = { id: Date.now(), title, description, status: "To Do" };
    setTasks([...tasks, newTask]);
    setTitle("");
    setDescription("");
  };

  const updateStatus = (id: number, status: "To Do" | "In Progress" | "Done"): void => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status } : task));
  };

  const deleteTask = (id: number): void => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="container">
      <div className="task-manager">
        <h2>Task Manager</h2>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea"
        ></textarea>
        <button onClick={addTask} className="add-btn">
          Add Task
        </button>

        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <select
                value={task.status}
                onChange={(e) => updateStatus(task.id, e.target.value as "To Do" | "In Progress" | "Done")}
                className="status-select"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
              <button
                onClick={() => deleteTask(task.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
