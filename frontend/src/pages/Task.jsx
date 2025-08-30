import { useState, useEffect } from "react";
import axios from "axios";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(res.data);
  };

  const addTask = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, { name }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setName("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
  };

  useEffect(() => {
    if (!token) window.location.href = "/login";
    fetchTasks();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Tasks</h2>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="New Task" />
      <button onClick={addTask} className="bg-blue-500 text-white p-2 rounded ml-2">Add</button>
      <ul className="mt-4">
        {tasks.map(task => (
          <li key={task._id} className="flex justify-between p-2 border-b">
            {task.name}
            <button onClick={() => deleteTask(task._id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
