// const options = { /* ... */ };
const io = require('socket.io')();
console.log('socket server started!'); 
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

io.listen(3050);



