import mongoose from 'mongoose';
var Schema = mongoose.Schema
let QuestionModelSchema =  new Schema({
    index: {
        type: Number,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true,
    }
})

export default mongoose.model('QuestionModel', QuestionModelSchema)
