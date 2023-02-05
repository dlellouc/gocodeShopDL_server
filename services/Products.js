
import { Products } from '../models/Products.js';

export const getAllProducts = () => {
    return Products.find({});
}

export const getOneProduct = (id) => {
    return Products.findOne({ _id: id })
}

export const addProduct = (title, price, description, category, image) => {
    const newProduct = new Products({ title: title, price: price, description: description, category: category, image: image });
    return newProduct.save();
}

export const deleteProduct = (id) => {
    return Products.findOneAndDelete({ _id: id })
}