import mongoose from "mongoose";

// schemas
const ProductSchema = new mongoose.Schema({                
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})


// model
export const Products = mongoose.model('Product', ProductSchema);      // Products = collection, row = document