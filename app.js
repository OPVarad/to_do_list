//jshint esversion:6

var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true,useUnifiedTopology:true});
const itemSchema={
    name:String
}
const Item=mongoose.model("Item",itemSchema);
const item1=new Item({
    name:"Welcome to Varad's To-Do_List",
});
const item2=new Item({
    name:"Pending Assignments",
});
const item3=new Item({
    name:"Today's target / Challenges",
});
const item4=new Item({
    name:"Class Schedule",
});
const item5=new Item({
    name:"Anything specific ?",
});
const d=[item1,item2,item3,item4,item5];

app.get("/",function(req,res)
{
    Item.find({},function(err,f)
    {
        if(f.length===0)
        {
            Item.insertMany(d,function(err){
                if (err){
                    console.log(err);
                }
                else
                    console.log("Successfully saved items to DataBase");
            });
            res.redirect("/");
        }
        else
            res.render("list",{newListItems:f});
    })
})
app.post("/",function(req,res)
{
    const itemName=req.body.n;
    const item = new Item({
        name:itemName
    });
item.save();
});
app.post("/delete",function(req,res)
{
    const check=req.body.checkbox;
    Item.findByIdAndRemove(check,function(err)
    {
        if(!err){
            console.log("Successfully Deleted");
            res.redirect("/");
        }
    })
});
app.listen(process.env.PORT || 5000,function()
{
    console.log("Listening on port 5000");
})