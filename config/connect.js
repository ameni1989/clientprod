const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://ameniweslati889:pass_word@cluster0.2qnbyfq.mongodb.net/ecole_formation?retryWrites=true&w=majority&appName=Cluster0')
.then (
    ()=>{
        console.log('connected to mongodb');
    }
)
.catch (
    (err)=>{
        console.log(err);
    }
)
module.exports=mongoose;
