
const mongoose=require("mongoose");
const Produit=mongoose.model (
    
       'produit', {
        name:{
           type:String,
          
        },
        description:{
            type:String,
        },
        price:{
            type:Number,
        },
        stock:{
            type:Number,
        },
        imagee:{
            type:String,
        },
    }

)
module.exports=Produit