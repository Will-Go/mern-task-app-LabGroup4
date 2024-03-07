import { Router} from "express";
import { createTask, updateTask, deleteTask, getCommentsBy } from "../controllers/comment.controller.js";



const router = Router();

router.get('/verComentarios/:taskId', getCommentsBy);
router.post('/agregarComentario', createTask);
router.put('/editarComentario/:taskId', updateTask);
router.delete('/eliminarComentario/:taskId', deleteTask);


export default router;