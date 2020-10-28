//在渲染器进程 (网页) 中。
const { ipcRenderer } = require('electron');

const form = document.querySelector('form');
form.addEventListener('submit',function(e){
  e.preventDefault();
  console.log('create student window form submit');
  const name = document.querySelector('#name').value;

});

console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})
ipcRenderer.send('asynchronous-message', 'ping')