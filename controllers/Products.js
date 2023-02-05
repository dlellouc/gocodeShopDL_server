
import { addProduct, getAllProducts, getOneProduct, deleteProduct } from "../services/Products.js";
import { productsAllowedUpdates } from '../data/data.js'

export const getAllProductsController = async (req, res) => {
    try {
        const allProducts = await getAllProducts();

        res.status(200).send(allProducts);

    } catch(error) {
        console.log(error);
        res.status(500).send({message:{error}});
    }

};

export const getOneProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await getOneProduct(id);

        if (!product) {
            res.status(404).send({ message: 'product does not exist' });
        }

        res.status(200).send(product);
    
    } catch(error) {
        console.log(error);
        res.status(500).send({message:{error}});
    }
}

export const addProductController = async (req, res) => {
    try {
        const { title, price, description, category, image } = req.body;
        const newProduct = await addProduct(title, price, description, category, image);

        res.status(200).send(newProduct);

    } catch(error) {
        console.log(error);
        res.status(500).send({message:{error}});
    }
}

export const updateProductController = async (req, res) => {
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => productsAllowedUpdates.includes(update));

    if (!isValidOperation) {
        res.status(400).send({ message: "Invalid updates" });
    }

    try {
        const { id } = req.params;
        const product = await getOneProduct(id);

        if (!product) {
            res.status(404).send({ message: 'product does not exist' });
        }

        updates.forEach((update) => (product[update] = req.body[update]));
        await product.save();

        res.status(200).send(product);

    } catch(error) {
        console.log(error);
        res.status(500).send({message:{error}});
    }
}

export const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await deleteProduct(id);

        if (!deletedProduct) {
            res.status(404).send({message: "no product with such id"});
        }
        res.status(200).send(deletedProduct);

    } catch(error) {
        console.log(error);
        res.status(500).send({message:error});
    }
}