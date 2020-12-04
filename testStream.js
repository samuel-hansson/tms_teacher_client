let fs = require('fs');
let number = 0;
let rs = fs.createReadStream('./context.txt', {
  highWaterMark: 3, 
  flags:'r',
  autoClose:true, 
  encoding:'utf8'
});
rs.on('error',function (err) {
  console.log(err)
});
rs.on('open',function () {
  console.log('文件打开了');
});
rs.on('data',function (data) {
    number++;

  console.log(number + ":" + data);
//   rs.pause(); 
});
// setTimeout(()=>{rs.resume()},1000); 
rs.on('end',function () {
  console.log('读取完毕了');
});
rs.on('close',function () {
  console.log('关闭')
});