//import body for express validator
//import second operator as validation result
import {body,validationResult} from 'express-validator';


//Import it in index.js and pass validation as a middleware
 //This is simple rules to handle validation
//This is the first process to validate form input
// const validation=(req,res,next)=>{
//     const{name, desc, price, imageUrl}=req.body;
//     let error=[];
//     if(!name||name.trim()==""){
//         error.push("Invalid name");
//     }
//     if(!desc||desc.trim()==""){
//         error.push("Give Description");
//     }
//     if(price<1){
//         error.push("Invalid Price");
//     }
//     try{
//         const urlcheck=new URL(imageUrl);
//     }catch(err){
//         error.push("Invalid URL");
//     }
//     //if have any error then send 1st error to the client and render it in new-product.ejs file 
//     if(error.length>0){
//        return res.render("new-product",{errorMSg:error[0]});
//     }
//     next();
    
// }



//Now we validate from using express-validator 

const validation=async(req,res,next)=>{
   //1. Setup rules for validation
     //first import body using express
     console.log(req.body)
    const rules=[
        body('name').notEmpty().withMessage("Name is required"),
        body('price').isFloat({gt:0}).withMessage("Price should be a positive value"),
        body('imageUrl').isURL().withMessage("Invalid url"),


    ];
   //2. Runs those rules
    //This is asynchronous operation so we use promises
     await Promise.all(rules.map(rule=>rule.run(req)));


   //3. Check if there are any errors after runing the rules.
      //first import validation result of express-validation
      var validatonErros=validationResult(req);
    //   console.log(validatonErros)
   //4. If there have error ,return the error message
    if(!validatonErros.isEmpty()){
        return res.render('new-product',{errorMSg:validatonErros.array()[0].msg});
    }
    next();
}
export default validation;