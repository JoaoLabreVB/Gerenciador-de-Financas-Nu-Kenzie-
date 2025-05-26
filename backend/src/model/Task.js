import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'A descrição é obrigatória'],
        trim: true,
        maxlength: [120, 'DEscrição não pode exceder 120 caracteres']
    },
    value: {
        type: Number,
        required: [true, 'O valor é obrigatório'],
        min: [0.00, 'O valor deve ser maior que 0']
    },
    type: {
        type: String,
        enum: {
            values: ['entrada', 'saída'],
            message: 'Tipo deve ser "entrada" ou "saída"'
        },
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
export default mongoose.model('Task', TaskSchema)