//在渲染器进程 (网页) 中。
const { ipcRenderer } = require('electron');

const form = document.querySelector('form');
form.addEventListener('submit',function(e){
  e.preventDefault();
  console.log('create student window form submit');
  // console.log(`进程的id是： ${process.pid}`);
  const name = document.querySelector('#name').value;

  /*
  ipcRenderer可以把数据发送给index.js（运行在主进程）,
  有点类似于Socket IO传输：给要发送给服务器端的数据起个名字，然后在服务器端通过相同
  的名字接收数据
  */
  ipcRenderer.send("create_student",name);
});

// console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

// ipcRenderer.on('asynchronous-reply', (event, arg) => {
//   console.log(arg) // prints "pong"
// })
// ipcRenderer.send('asynchronous-message', 'ping')