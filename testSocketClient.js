//关于socket.io-client参考：https://www.npmjs.com/package/socket.io-client
const io = require('socket.io-client');
const socket = io("ws://localhost:3050", {});

// socket.emit('input', msg);
// socket.on('output', data =>{
// //执行操作.
// });