const mongoose=require("mongoose");
const Chats=require("./models/chats.js");
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

main().then(()=>{
    console.log("connection is successful");
})
.catch((err)=>{
    console.log(err);
})

let allChats=[{
    from:"omesh",
    to:"anshita",
    message:"can you please send me notes?",
    createdAt:new Date()
},
{
    from:"omesh",
    to:"maa",
    message:"aap sehore se aa gyi kya?",
    createdAt:new Date()
},{
    from:"omesh",
    to:"sanskriti",
    message:"hii sankati kaise h tu?",
    createdAt:new Date()
}];
Chats.insertMany(allChats);

// for(Chat of allChats){
//     console.log(Chat);
// }


