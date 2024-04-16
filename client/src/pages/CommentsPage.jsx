import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useAuth } from "../context/AuthContext";
import { useComments } from "../context/CommentsContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CommentCard from "../components/CommentCard";
import TaskCard from "../components/TaskCard";
import { set } from "mongoose";

function CommentsPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createComment, getCommentsBy, comments, setComments } = useComments();
  const { user } = useAuth();
  const { getTask } = useTasks();
  const params = useParams();

  const logedUser = user;

  const onSubmit = handleSubmit(async (data) => {
    if (user && params.id) {
      const comment = {
        text: data.text,
        user: logedUser.id,
        authorName: logedUser.username,
        taskId: params.id,
      };

      const resComment = await createComment(comment);
      setComments((prev) => [...prev, { ...comment }]);
      setValue("text", "");
    } else {
      alert("Necesitas estar logueado para comentar");
    }
  });

  const [taskData, setTaskData] = useState(null);

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        setTaskData(task);
        getCommentsBy(params.id);
      }
    }
    loadTask();
  }, []);

  return (
    <div>
      <div>{taskData && <TaskCard task={taskData} showOptions={false} />}</div>
      <h1 className="text-2xl font-bold my-3">Comments</h1>
      <form onSubmit={onSubmit} className="flex gap-3 my-3">
        {" "}
        <textarea
          className="border-2 border-black text-black rounded-md p-2 w-full"
          {...register("text", { required: "Campo requerido" })}
        />
        <button type="submit" className="rounded-full bg-violet-500 w-fit p-3 ">
          Commentar
        </button>
      </form>
      <div className="grid gap-2">
        <div className="flex flex-col max-h-[300px] overflow-y-scroll gap-3 border-2 border-black rounded-md p-3 ">
          {comments.length === 0 && <p>No hay comentarios</p>}
          {comments.map((comment, i) => (
            <CommentCard key={i} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommentsPage;
