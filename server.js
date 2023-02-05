import express from 'express'
import cors from 'cors'

import { productsAllowedUpdates } from './data/data.js'

import { mongoose } from 'mongoose'

import * as dotenv from 'dotenv'


dotenv.config();
const { PORT, DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env

// server initialization
const app = express();

// middlewares for the server
app.use(express.json());
app.use(cors());
mongoose.set('strictQuery', true);


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
const Products = mongoose.model('Product', ProductSchema);      // Products = collection, row = document


// routes

// get - fetch from db - mongo function : findOne({condition:condition}) / find({condition:condition}) or find({})
// post - add an item to db - new Model({parameters:parameters}) --> model.save()
// put - edit an item inside the db - valid operations --> findOne({condition:condition}) --> model.save()
// delete - delete an item from the db - findOneAndDelete({condition:condition})

app.get('/api/products/getAllProducts', async (req, res) => {
    try {
        const allProducts = await Products.find({});
        res.status(200).send(allProducts);
    } catch(error) {
        console.log(error);
        res.status(500).send({message:{error}});
    }
})

app.get('/api/products/getProduct/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.findOne({ _id: id });
        if (!product) {
            res.status(404).send({ message: 'product does not exist' });
        }

        res.status(200).send(product);
    
    } catch(error) {
        console.log(error);
        res.status(500).send({message:{error}});
    }
})

app.post('/api/products/addProduct', async (req, res) => {
    try {
        const { title, price, description, category, image } = req.body;
        const newProduct = new Products({title: title, price: price, description: description, category: category, image: image});
        await newProduct.save();
        res.status(200).send(newProduct);
    } catch(error) {
        console.log(error);
        res.status(500).send({message:{error}});
    }
});

app.put('/api/products/updateProduct/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => productsAllowedUpdates.includes(update));

    if (!isValidOperation) {
        res.status(400).send({ message: "Invalid updates" });
    }

    try {
        const { id } = req.params;
        const product = await Products.findOne({ _id: id });
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
})

app.delete('/api/products/deleteProduct/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Products.findOneAndDelete({_id: id});
        if (!deletedProduct) {
            res.status(404).send({message: "no product with such id"});
        }
        res.status(200).send(deletedProduct);
    } catch(error) {
        console.log(error);
        res.status(500).send({message:error});
    }
})


// without mongodb atlas :
mongoose.connect('mongodb://127.0.0.1:27017/shop_db', {               // shop_db = db
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// listener at the bottom which concludes the listening function to fulfill all of the requests
app.listen(PORT, () => {
    console.log('server listening at port *')
});


// with mongodb atlas :
// mongoose.connect('mongodb at atlas', {               
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, (info) => {
//     console.log('info ?', info);
//     app.listen(PORT, () => {
//         console.log('server listening at port *')
//     })
// })