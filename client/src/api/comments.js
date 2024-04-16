import axios from './axios';

export const getCommentsRequestBy = (id) => axios.get(`/verComentarios/${id}`);
export const createCommentRequest = (comment) => axios.post('/agregarComentario', comment);
export const updateCommentRequest = (id, updatedComment) => axios.put(`/editarComentario/${id}`, updatedComment);
export const deleteCommentRequest = (id) => axios.delete(`/eliminarComentario/${id}`);

