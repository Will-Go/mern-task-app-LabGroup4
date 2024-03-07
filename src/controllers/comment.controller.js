import Comment from '../models/comment.model.js';

export const getCommentsBy = async (req, res) => {
    const tasks = await Comment.find({ taskId: req.params.taskId });
    res.json(tasks);
}

export const createTask = async (req, res) => {
    const { authorName, text, date, taskId } = req.body;

    const newComment = new Comment({
        user: req.user.id,
        authorName,
        text,
        date,
        taskId: taskId
    });
    const savedComment = await newComment.save();
    res.json(savedComment);
}

export const deleteTask = async (req, res) => {
    const comment = await Comment.findByIdAndDelete(req.params.taskId);
    if (!comment) return res.status(404).json({ message: "Task not found" });
    return res.sendStatus(204);
}

export const updateTask = async (req, res) => {
    const comment = await Comment.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
    if (!comment) return res.status(404).json({ message: "Task not found" });
    return res.json(comment);

}

