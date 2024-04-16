import { Link } from "react-router-dom";
import { useTasks } from "../context/TasksContext";

function TaskCard({ task, showOptions = true }) {
  const { deleteTask } = useTasks();
  return (
    <div className="bg-zinc-800 w-full  p-10 rounded-md">
      <header className="flex flex-col justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <p className="text-slate-300">{task.description}</p>
        {showOptions && (
          <div className="flex flex-wrap italic gap-x-2 items-center">
            <button
              className="italic"
              onClick={() => {
                deleteTask(task._id);
              }}>
              Delete
            </button>
            <Link to={`/tasks/${task._id}`}> Edit</Link>
            <Link to={`/comments/${task._id}`}> Comments</Link>
          </div>
        )}
      </header>
    </div>
  );
}

export default TaskCard;
