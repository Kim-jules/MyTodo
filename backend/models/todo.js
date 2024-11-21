import mongoose from 'mongoose'

const TodoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: false, // Assuming description is optional
        trim: true,
        maxlength: 255 // You can set a limit if needed
    },
    done: {
        type: Boolean,
        default: false // Indicates if the todo item is completed
    }
}, { timestamps: true });


export default mongoose.model('Todo', TodoSchema)