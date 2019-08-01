const Koa = require('koa');
// var cors = require('koa2-cors');
const app = new Koa();


// app.use(cors());



//router
const Router = require('koa-router');

//父路由
const router = new Router();

//bodyparser:该中间件用于post请求的数据
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

//引入数据库操作方法
const UserController = require('./server/controller/user.js');

//checkToken作为中间件存在
const checkToken = require('./server/token/checkToken.js');

//登录
const loginRouter = new Router();
loginRouter.post('/login', UserController.Login);
router.use('/api',loginRouter.routes(),loginRouter.allowedMethods());

//注册
const registerRouter = new Router();
registerRouter.post('/register', UserController.Reg);
router.use('/api',registerRouter.routes(),registerRouter.allowedMethods());

//获取所有用户
const userRouter = new Router();
userRouter.get('/user', UserController.GetAllUsers);
router.use('/api',userRouter.routes(),userRouter.allowedMethods());

//删除某个用户
const delUserRouter = new Router();
delUserRouter.post('/delUser', checkToken, UserController.DelUser);
router.use('/api',delUserRouter.routes(),delUserRouter.allowedMethods());

// 列表操作
const InfoListController = require('./server/controller/InfoList.js');

const FindAlllistRouter = new Router();
FindAlllistRouter.post('/recycleBin',InfoListController.FindList);
router.use('/task',FindAlllistRouter.routes(),FindAlllistRouter.allowedMethods());


const InfolistRouter = new Router();
InfolistRouter.post('/Addlist',InfoListController.Addlist);
router.use('/task',InfolistRouter.routes(),InfolistRouter.allowedMethods());

const uploadListInfo = new Router();
uploadListInfo.post('/upload',InfoListController.uploadListInfo);
router.use('/task',uploadListInfo.routes(),uploadListInfo.allowedMethods());





//装载上面四个子路由




//加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(8888,'0.0.0.0', () => {
    console.log('The server is running at http://localhost:' + 8888);
});

