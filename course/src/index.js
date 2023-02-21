const http=require("http");

const server=http.createServer(async(req,res)=>{
    if(req.url==="/" && req.method==="GET"){
        res.writeHead(200,{"Content-Type":"application/json"});
        res.write(JSON.stringify({message:"hello"}));
        res.end();
        return;
    }else if(req.url==="/prabesh" && req.method==="GET"){
        res.writeHead(200,{"Content-Type":"application/json"});
        res.write(JSON.stringify({message:"Hey I am Prabesh"}))
        res.end();
    }
    res.writeHead(404,{"Content-Type":"application/json"});
    res.end(JSON.stringify({message:"nope"}));
})

server.listen(3001,()=>{
    console.log(`Server running at PORT ${3001}`)
})