"use client";

import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");

    useEffect(() => {
        const fetchTasks = async () => {
          const querySnapshot = await getDocs(collection(db, "completed_tasks"));
          const taskList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setTasks(taskList);
        };
        fetchTasks();
      }, []);
    
      const deleteTask = async (taskId) => {
        await deleteDoc(doc(db, "completed_tasks", taskId));
        setTasks(tasks.filter((task) => task.id !== taskId));
      };
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mr-5 my-5">Completed Tasks</h1>
            <hr />
            <ul>
                {tasks.map((task) => (
                <li key={task.id} className="flex justify-between items-center p-2 border-b">
                    {/* <div>
                        <input className="mr-2"
                        type="checkbox" 
                        onChange={() => completeTask(task)}
                        />
                        
                    </div> */}
                    
                        <div><span className="text-xl">{task.text}</span></div>
                        <button onClick={() => deleteTask(task.id)} className="bg-slate-800 px-5 py-3 rounded-md text-white font-bold">Delete</button>
                    
                </li>
                ))}
            </ul>
        </div>
    )
}