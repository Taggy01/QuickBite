import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    foodTime: {
        type: String,
        required: true
    },
    foodImage: {
        type: String,
        required: true,
    },
    imageId : {
        type: String,
        required : true,
    }
},{timestamps: true})

export default mongoose.model("Foods", foodSchema);