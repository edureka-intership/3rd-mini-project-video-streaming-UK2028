const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const videoRouter = require("./Routes/videoRouters");
const server = express();


const PORT = 9090;
const URI = "mongodb://localhost:27017/video";

mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true},
    (err) =>{
        if(err){
            console.log(err)
        }
        else{
            console.log(`server is connected to database`)
        }
    });

server.use(bodyParser.json());
server.use('/', videoRouter);

server.listen(PORT,() => {console.log(`server started listenig at ${PORT}`)});
