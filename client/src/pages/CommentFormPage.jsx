import { useForm } from "react-hook-form";

import { useComments } from "../context/CommentsContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { getCommentBy, updateComment } = useComments();

  const [commentData, setCommentData] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      console.log(data);
      await updateComment(params.id, data);
    }

    setTimeout(() => {
      navigate(`/comments/${commentData.taskId}`);
    }, 2000);
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const comment = await getCommentBy(params.id);
        console.log(comment);
        setCommentData(comment);
        setValue("text", comment.text);
      }
    }
    loadTask();
  }, []);

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <textarea
          rows="3"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Comentario"
          {...register("text")}></textarea>
        <button>Save</button>
      </form>
    </div>
  );
}
export default TaskFormPage;
