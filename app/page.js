"use client";

import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";


export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, "not_completed_tasks"));
      const taskList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTasks(taskList);
    };
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (task.trim() === "") return;
    const docRef = await addDoc(collection(db, "not_completed_tasks"), { text: task });
    setTasks([...tasks, { id: docRef.id, text: task }]);
    setTask("");
  };

  const deleteTask = async (taskId) => {
    await deleteDoc(doc(db, "not_completed_tasks", taskId));
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={addTask} className="mb-4">
        <input
          type="text"
          placeholder="Add a task"
          value={task || ""}
          onChange={(e) => setTask(e.target.value)}
          className="border p-2"
        />
        <button type="submit" className="ml-2 bg-blue-500 text-white p-2">Add</button>
      </form>
      
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between p-2 border-b">
            <span>{task.text}</span>
            <button onClick={() => deleteTask(task.id)} className="bg-red-500 text-white p-1">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
