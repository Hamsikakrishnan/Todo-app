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
  
  const completeTask = async (task) => {
    await addDoc(collection(db, "completed_tasks"), { text: task.text });
    await deleteDoc(doc(db, "not_completed_tasks", task.id));
    setTasks(tasks.filter((t) => t.id !== task.id));
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={addTask} className="mb-4 items-center">
        <input
          type="text"
          placeholder="Add a task"
          value={task || ""}
          onChange={(e) => setTask(e.target.value)}
          className="border p-3 cursor-pointer w-96 text-xl"
        />
        <button type="submit" className="ml-2 bg-blue-500 rounded-lg px-5 py-3 text-white p-2">Add Task</button>
      </form>
      
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center justify-between p-2 border-b">
            <div>
                <input className="mr-2 w-4 h-4"
                  type="checkbox" 
                  onChange={() => completeTask(task)}
                />
                <span className="text-xl">{task.text}</span>
            </div>
            <button onClick={() => deleteTask(task.id)} className="bg-slate-800 px-5 py-3 rounded-md text-white font-bold">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
