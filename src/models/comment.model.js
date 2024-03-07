import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        authorName:{
            type: String,
            required: true
        },
        text:{
            type: String,
            required: true
        },
        date:{
            type: Date,
            default: Date.now
        },
        taskId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:  'Task'
        }
    }, {timestamps: true}
);

export default mongoose.model('Comment', commentSchema);