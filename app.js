const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const videoRouter = require("./Routes/videoRouters");
const server = express();

const PORT = 9090;
const URI = "mongodb://localhost:27017/video";
const staticPath = path.join(__dirname,'public');

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
server.use(express.static(staticPath));
server.get('/',(req,res)=>{
    res.sendFile(path.join(staticPath,'app.html'));
})

server.use('/', videoRouter);

server.listen(PORT,() => {console.log(`server started listenig at ${PORT}`)});
