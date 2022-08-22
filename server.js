const express = require("express");
const mongoose= require("mongoose");
const bodyParser= require("body-parser");

const app =express();
app.use(express.static("public"));   
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://Aditya:Aditya12345@contact-data.zykag.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true});
const messageSchema = new mongoose.Schema({
    name:  String,
    email: String,
    phone: Number,
    project: String,
    message: String,
})
const Message= mongoose.model("message",messageSchema);

app.get("/", function(req,res){
    res.sendFile(__dirname+"/Contact.html");
});
app.post("/",function(req,res){
    const message= new Message({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        project: req.body.project,
        message : req.body.msg,
    })
    message.save();
    res.sendFile(__dirname+"/ack.html");
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);