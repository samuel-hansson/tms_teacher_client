var fs=require('fs');
var url=require('url');


//代码参考https://www.cnblogs.com/lyy-2016/p/6730972.html
const server = require('http').createServer(
    function(req,res){
        if(req.url!="/favicon.ico"){
            var urlObj=url.parse(req.url,true,false);
            console.log(urlObj.pathname);
            fs.readFile('.'+urlObj.pathname+'.html',function(err,data){
                if(err){
                    res.writeHead(404);
                    res.end(JSON.stringify(err));
                    return;
                }
                console.log(data.toString());
                //将文件的内容写入res响应对象
                res.end(data);
            });
        }
        console.log("a request incomming...");
    }
);

const options = { /* ... */ };
const io = require('socket.io')(server, options);







io.on('connection', socket => { 
    /* ... */ 
    console.log('a user connected'); 
    // socket.on("input",msg=>{
    //     console.log(msg);
    //     io.emit("output", data);
    // });

    // socket.on("disconnect", () => {
    //     console.log("user disconnected");
    // });
});



server.listen(3050);
console.log('http server with socket server started!'); 



