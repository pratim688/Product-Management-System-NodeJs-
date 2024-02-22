//you can assign it in index.js to use it publically but you want to add it inside layout.ejs using script tag
function deleteProduct(id){
   const result= confirm("Are you sure want to delete this product");
   if(result){
    fetch("/delete/"+id,{
        method:"POST"
    }).then(res=>{
        if(res.ok){
            location.reload();
        }
    })
   }
}