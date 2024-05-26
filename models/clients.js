const mongoose=require('mongoose');
const Client=mongoose.model(
    //User le nom de l'enregidtr dans database
    'Client', {
         name:{
            type:String
         },
         lastname:{
            type:String
         },
         age:{
            type:Number
         }

    }
);
module.exports=Client