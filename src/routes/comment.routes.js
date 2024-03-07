import { Router} from "express";
import { createTask, updateTask, deleteTask } from "../controllers/comment.controller.js";



const router = Router();

router.post('/agregar', createTask);
router.put('/editar', updateTask);
router.delete('/eliminar', deleteTask);


export default router;