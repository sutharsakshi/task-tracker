import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "./services/taskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title required");
      return;
    }

    await createTask({ title, description });

    setTitle("");
    setDescription("");

    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  const toggleStatus = async (task) => {
    await updateTask(task._id, {
      status:
        task.status === "pending"
          ? "completed"
          : "pending",
    });

    fetchTasks();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Task Tracker</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <button type="submit">Add Task</button>
      </form>

      <div style={{ marginTop: "30px" }}>
        {tasks.map((task) => (
          <div
            key={task._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "10px",
            }}
          >
            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>Status: {task.status}</p>

            <button onClick={() => toggleStatus(task)}>
              Toggle Status
            </button>

            <button
              onClick={() => handleDelete(task._id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;