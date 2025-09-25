const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Chats=require("./models/chats.js");
const methodOverride=require("method-override");

app.listen(8080,()=>{
    console.log("server is listening to 8080");
})

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
main()
.then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

//root route
app.get("/",(req,res)=>{
    res.render("root.ejs");
})

// let chat1=new Chats({
//     from:"omesh",
//     to:"jagriti",
//     message:"hii jagriti can you please tell me whether will you join codeforces contest with me tomorrow",
//     createdAt:new Date()
// });
// Chats.insertMany(chat1);//Mistake:insertOne is basically a function which exists in mongDb not in mongoose

//index route
app.get("/chats",async (req,res)=>{
    let chats=await Chats.find();
    console.log(chats);
   res.render("index.ejs",{chats});
})
//new route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})
//create route
app.post("/chats",(req,res)=>{
    let {from,to,message}=req.body;
    let newChat=new Chats({
        from:from,
        to:to,
        message:message,
        createdAt:new Date()
    })
    newChat.save().then((res)=>{
        console.log("chat was saved")
    }).catch((err)=>{
        console.log(err);
    })
    res.redirect("/chats");
})

//edit route
app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let chat=await Chats.findById(id);
    res.render("edit.ejs",{chat});
})
//update route
app.put("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let {message:newMsg}=req.body;
    let updatedChat=await Chats.findByIdAndUpdate(id,{message:newMsg},{runValidators:true,new:true});
    console.log(updatedChat);
    res.redirect("/chats");
})
//DESTROY ROUTE
app.delete("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let deletedChat=await Chats.findByIdAndDelete(id);
    res.redirect("/chats");
})