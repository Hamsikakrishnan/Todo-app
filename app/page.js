import Image from "next/image";

export default function Home() {
  return (
    //Create a todo app with firebase for storing, addign operations such as adding deleting and a difference between not completed and completed tasks
    //Create a form for adding tasks
    //Create a list for displaying tasks
    //Create a button for deleting tasks
    //Create a button for marking tasks as completed
    //Create a button for viewing completed tasks
    //Create a button for viewing not completed

    <div>
      <h1>Todo App</h1>
      <form>
        <input type="text" placeholder="Add a task" />
        <button >Add</button>
      </form>
      <ul>
        <li>
          <input type="checkbox" />
          <span>Task 1</span>
          <button>Delete</button>
        </li>
        <li>
          <input type="checkbox" />
          <span>Task 2</span>
          <button>Delete</button>
        </li>
        <li>
          <input type="checkbox" />
          <span>Task 3</span>
          <button>Delete</button>
        </li>
      </ul>
      <button>View Completed</button>
      <button>View Not Completed</button>
    </div>
  );
}
