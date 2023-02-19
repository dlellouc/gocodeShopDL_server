import express from 'express'
import cors from 'cors'

import { productsAllowedUpdates } from './data/data.js'

import { mongoose } from 'mongoose'
import { addProductController, deleteProductController, getAllProductsController, getOneProductController, updateProductController } from './controllers/Products.js'

import * as dotenv from 'dotenv'


dotenv.config();
const { PORT, DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env

// server initialization
const app = express();

// middlewares for the server
app.use(express.json());
// app.use(express.urlencoded({extended: false})) // test for empty body
app.use(cors());

mongoose.set('strictQuery', true);



// routes

// get - fetch from db - mongo function : findOne({condition:condition}) / find({condition:condition}) or find({})
// post - add an item to db - new Model({parameters:parameters}) --> model.save()
// put - edit an item inside the db - valid operations --> findOne({condition:condition}) --> model.save()
// delete - delete an item from the db - findOneAndDelete({condition:condition})

app.get('/api/products/getAllProducts', getAllProductsController);
app.get('/api/products/getOneProduct/:id', getOneProductController);
app.post('/api/products/addProduct', addProductController);
app.put('/api/products/updateProduct/:id', updateProductController);
app.delete('/api/products/deleteProduct/:id', deleteProductController);


// without mongodb atlas :
// mongoose.connect('mongodb://127.0.0.1:27017/shop_db', {               // shop_db = db
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

// // listener at the bottom which concludes the listening function to fulfill all of the requests
// app.listen(PORT, () => {
//     console.log('server listening at port *')
// });


// with mongodb atlas :
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`, {               
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (info) => {
    console.log('info ?', info);
    app.listen(PORT, () => {
        console.log('server listening at port *')
    })
})