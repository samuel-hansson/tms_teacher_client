const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow} = electron;

//通常electron应用会包含一个窗口
let mainWindow;

//监听代表应用的对象app是否创建好
app.on('ready',function(){
    
    //创建窗口
    mainWindow = new BrowserWindow({});

    //加载html页面
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }))
});