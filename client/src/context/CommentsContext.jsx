import { createContext, useContext, useState } from "react";
import {
  getCommentsRequestBy,
  getCommentRequestBy,
  createCommentRequest,
  updateCommentRequest,
  deleteCommentRequest,
} from "../api/comments";

const CommentContext = createContext();

export const useComments = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error("useComments must be used within a CommentsProvider");
  }
  return context;
};

function CommentsProvider({ children }) {
  const [comments, setComments] = useState([]);

  const createComment = async (comments) => {
    try {
      const res = await createCommentRequest(comments);
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const getCommentsBy = async (id) => {
    try {
      const res = await getCommentsRequestBy(id);
      console.log(res);
      setComments(res.data);
    } catch (error) {}
  };
  const getCommentBy = async (id) => {
    try {
      const res = await getCommentRequestBy(id);
      console.log(res);
      return res.data;
    } catch (error) {}
  };

  const deleteComment = async (id) => {
    try {
      const res = await deleteCommentRequest(id);
      if (res.status === 204)
        setComments(comments.filter((comment) => comment._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const updateComment = async (id, comment) => {
    try {
      const res = await updateCommentRequest(id, comment);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        setComments,
        createComment,
        getCommentsBy,
        deleteComment,
        updateComment,
        getCommentBy,
      }}>
      {children}
    </CommentContext.Provider>
  );
}

export default CommentsProvider;
