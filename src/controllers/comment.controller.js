import Comment from '../models/comment.model.js';


export const createTask = async (req, res) => {
    const { authorName, text, date } = req.body;

    const newComment = new Comment({
        authorName,
        text,
        date,
        taskId: req.task.id
    });
    const savedComment = await newComment.save();
    res.json(savedComment);
}

export const deleteTask = async (req, res) => {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).json({ message: "Task not found" });
    return res.sendStatus(204);
}

export const updateTask = async (req, res) => {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!comment) return res.status(404).json({ message: "Task not found" });
    return res.json(comment);

}

