const express = require ("express");

const path =require("path");


const app = express();

app.get("/", (req,res)=>{
    //res.send("App funcionando");

    res.sendFile(path.join(__dirname, "html", "basic.html"));
});

app.listen(3000, ()=> {
    console.log("Server running on port ", 3000);
});