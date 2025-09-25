const mongoose=require("mongoose");
const chatSchema=new mongoose.Schema({
from:{
    type:String,
    required:true
},
to:{
    type:String,
    required:true
},
message:{
    type:String,
    maxLength:50*2
},
createdAt:{
    type:Date,
},
updatedAt:{
    type:Date,
    default:Date.now()
}
})

const Chats=mongoose.model("Chats",chatSchema);
module.exports=Chats;