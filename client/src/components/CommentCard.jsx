import { Link } from "react-router-dom";
import { useComments } from "../context/CommentsContext";

function CommentCard({ comment }) {
  const { deleteComment } = useComments();
  return (
    <div className="bg-zinc-800 max-w-md w-full p-3 rounded-md">
      <header className="flex flex-col justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-black rounded-full h-6 w-6"></div>
          <h3 className=" font-bold">{comment.authorName || "username"}</h3>
        </div>
        <p className="text-slate-300">{comment.text}</p>
        <div className="flex gap-x-2 items-center">
          <button
            onClick={() => {
              deleteComment(comment._id);
            }}>
            {" "}
            Delete{" "}
          </button>
          <Link to={`/editComments/${comment._id}`}> Edit</Link>
        </div>
      </header>
    </div>
  );
}

export default CommentCard;
