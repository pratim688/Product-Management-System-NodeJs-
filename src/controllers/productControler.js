
import ProductModel from '../models/productModel.js';

export default class ProductController{

    getProducts(req,res){
        let products = ProductModel.get()
        // console.log(products);
        res.render("products",{products: products})
        // return res.sendFile(path.join(path.resolve(),"src",'views',"products.html" ));
    }
    getAddForm(req,res){
       return res.render("new-product",{errorMSg:null});
    }
    addNewProduct(req,res){
        //Client side validation of from data
        // const{name, desc, price, imageUrl}=req.body;
        // let error=[];
        // if(!name||name.trim()==""){
        //     error.push("Invalid name");
        // }
        // if(!desc||desc.trim()==""){
        //     error.push("Give Description");
        // }
        // if(price<1){
        //     error.push("Invalid Price");
        // }
        // try{
        //     const urlcheck=new URL(imageUrl);
        // }catch(err){
        //     error.push("Invalid URL");
        // }
        // //if have any error then send 1st error to the client and render it in new-product.ejs file 
        // if(error.length>0){
        //    return res.render("new-product",{errorMSg:error[0]});
        // }

        /////////
        
        //This is not good idea to put that code in controller,so put that code in middleware for loosely coupling
        //validation is also done using express freamwork-npm install express-validator
        


        //first acess the data and then push the data inside model
        //req.body is use for known form data
        // console.log(req.body);//undefiend because data is encripted format so dont understand thosse data,then you need to parse formdata in index.js
        ProductModel.add(req.body);//pass requested form data 
        let products=ProductModel.get();
        res.render("products",{products: products})

    }
    getUpdateProductView(req,res,next){
        // If product exists the n return true
         //to access the parameter of the url in index.js to find the id

        const id=req.params.id;
         const productFound = ProductModel.getById(id);
         if(productFound){
            res.render('update-product',{product:productFound,errorMSg:null});
         }
        //Else return errors
        else{
            res.status(401).send("Product not found");
        }
    }
    postUpdate(req,res){
        ProductModel.Update(req.body);
        // console.log(req.body);
        let products=ProductModel.get();
        res.render("products",{products: products})
    }
    deleteProduct(req,res){
        const id=req.params.id;
        console.log(id);
        ProductModel.Delete(id);
        let products=ProductModel.get();
        return res.render("products",{products:products});
    }
}