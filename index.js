const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

//通常electron应用会包含一个窗口
let mainWindow;
let StudentWindow;

//监听代表应用的对象app是否创建好
app.on('ready',function(){
    
    //创建主窗口
    mainWindow = new BrowserWindow({
        ​​​​​​​webPreferences: {
            nodeIntegration: true
         }
    });

    //加载html页面
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    /*
    如果不加该事件处理，那么子窗口（添加学生窗口）打开，主窗口关闭的话，
    子窗口依然会存在，这不符合逻辑。主窗口关闭，子窗口就应该也跟着关闭，
    因此，要给主窗口添加上关闭的事件处理————整个应用退成。
    */
    mainWindow.on('closed',function(){
        app.quit();
    });


    //使用模板加载菜单
    const menu = Menu.buildFromTemplate(menuTemplate);
    //给窗口设置菜单
    /*
        此处没有指定是哪个窗口设置菜单，所以，程序创建的所有的窗口都会有这个菜单，
        无论是主窗口还是添加学生窗口
        */
    Menu.setApplicationMenu(menu);
});


//处理“添加学生”菜单项事件：创建添加学生窗口
function createStudentWindow(){
    //创建添加学生的窗口，代码跟前面创建主窗口代码一样
    StudentWindow = new BrowserWindow({

        width: 300,
        height: 200,
        title:  '添加学生'
    });

    //加载html页面
    StudentWindow.loadURL(url.format({
        pathname: path.join(__dirname,'createStudentWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    /*
    为了节省资源（————优化程序），子窗口（添加学生窗口）关闭时，让其变为空。
    这样垃圾收集器就会将子窗口占用的内存空间回收掉
    */
    StudentWindow.on('closed',function(){
        StudentWindow = null;
    });
}


/*
接收来自createStudentWindow窗口的createStudentWindow.html页面的数据。
回调函数的第二个参数student保存着createStudentWindow窗口的createStudentWindow.html页面
传递过来的数据
*/
ipcMain.on("create_student",function(event, student){
    console.log(student);
    //把数据传递给在主窗口mainWindow显示的页面mainWindow.html上
    mainWindow.webContents.send("create_student",student);
    StudentWindow.close();
});

//创建菜单模板
//菜单模板是一个对象数组，在JS中，一对花括号“{}”，就是一个对象，代表一个菜单项
const menuTemplate = [
    //一个菜单项就是一个对象
    {
        label: '学生管理',      //菜单项的名字
        //submenu代表该菜单项还有子菜单，submenu也是一个对象数组
        submenu: [
            {
                //子菜单项的名字
                label: '添加学生',
                click(){
                    createStudentWindow();
                }
            },
            {
                label: '删除学生'
            },
            {
                label: '修改学生'
            },
            {
                label: '退出',
                //如果希望通过快捷键来执行菜单功能————而非点击菜单项，则使用accelerator属性
                /*使用三元运算符（ternary operator）判断程序运行的平台是什么平台？是Windows？Linux?还是Mac
                    因为使用Mac的话，快捷键会使用“command”，而如果使用Windows或者Linux，快捷键会使用“ctrl”
                */
                accelerator: process.platform == 'darwin' ? 'Command+Q' :
                'Ctrl+Q',
                //添加一个事件处理函数，代表菜单项的功能
                click(){
                    app.quit();
                }
            }
        ]               
    }
];


/*
unshift方法的意思是在数组的最前面添加一个元素，此处是一个空菜单项对象。
之所以这么做，是因为在Mac系统运行Electron程序，菜单栏的第一个不是程序员
自己设定的菜单项————本例中是“添加学生”，而是“Electron”,为了让程序员
自己设定的菜单项在菜单模板————本例中是menuTemplate中始终是第一个菜单项，
添加一个空对象{}，并在菜单模板的第一个元素位置上。
*/
if(process.platform == 'darwin'){
    menuTemplate.unshift({});
}

console.log(`进程的id是： ${process.pid}`);

/*
    如果应用不是在生产环境下，可以给应用控制打开Chrome自带的开发者工具功能，做法是
    定义一个菜单项，给其添加事件处理，在事件处理中调用toggleDevTools方法
    
*/
if(process.env.NODE_ENV !== 'production'){
    menuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' :
                'Ctrl+I',
                /*
                item参数代表用户点击的菜单项，focusedWindow参数代表获得
                焦点的窗口。因为窗口有多个，每个窗口的菜单栏都一样，因此，
                哪个窗口点击了，参数focusedWindow就代表哪个窗口。
                */
                click(item, focusedWindow){
                    /*
                        toggleDevTools方法是webContents类的方法（参见JavaScript(1).docx文件）。

                    */
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}