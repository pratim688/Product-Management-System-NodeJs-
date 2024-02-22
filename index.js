//First npm init for create package.json
//Second create folder of entry point
//install express-npm i express(check package.json)
//create server ----


import express from 'express'
import path from 'path'
import ejsLayout from 'express-ejs-layouts'
import ProductControler from './src/controllers/productControler.js'
import validation from './src/middleware/Validation.js'
const server = express();
server.use(express.static('public'));

//parse form data
server.use(express.urlencoded({extended:true}));

// setup view engine settings
server.set("view engine","ejs");
server.set("views",path.join(path.resolve(),'src','views'));
//Use the ejs layout
server.use(ejsLayout);

// Create an instance of Product controller to access the method
const productControler = new ProductControler();
server.get('/',productControler.getProducts);

//creating another request for render new product
server.post('/',validation,productControler.addNewProduct)
server.get('/new',productControler.getAddForm);
//passing also the id to acces those id in controller(called URL parameter)
server.get('/update-product/:id',productControler.getUpdateProductView);
//Update the form data
server.post('/update-product',productControler.postUpdate);
//Delete product(should be post request)
server.post('/delete/:id',productControler.deleteProduct);
// this is use for access all the file in views like css file
server.use(express.static('src/views'));
server.listen(3000,()=>{
    console.log("Server is running in port 3000");
})