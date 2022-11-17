const videoData = require("../model/videoData.js");
const path = require('path');
const videoDir = path.join(__dirname,'video');
const fs = require('fs');

exports.listAPI = (req,res) => {
    videoData.find()
    .then(result => {
        res.status(200).json({
            message:"data fetched from database",
            data:result
        })
    })
    .catch(err => {
        res.status(500).json({
            message:"data not fetched",
            ERROR:err
        })
    })
}

exports.detailAPI = (req,res) => {
    videoData.find({_id:req.params.id})
    .then((result) => {
        res.status(200).json({
            message:"data fetched from database",
            data:result
        })
    })
    .catch(err => {
        res.status(500).json({
            message:"data not fetched",
            ERROR:err
        })
    })
}

exports.streamAPI = (req,res) => {
    const range = req.headers.range
    if(!range){
        res.status(400).send("requires range headers");
    }
    const videoShow = videoData.find({_id:req.params.id});
    const videoPath = path.join(videoDir,videoShow.path);
    const videoSize = fs.statSync(videoPath).size;
    const chunkSize = 10**6;
    const start = Number(range.replace(/\D/g,""));
    const end = Math.min(start+chunkSize,videoSize-1);
    const contentLength = end - start + 1;
    const headers = {
        "content-Range":`bytes ${start}-${end}/${videoSize}`,
        "Accept-range":"bytes",
        "content-Length":contentLength,
        "content-type":"video/mp4"
    }
    res.writeHead(206,headers);
    const videoStream = fs.createReadStream(videoPath,{start,end});
    videoStream.pipe(res);
}
