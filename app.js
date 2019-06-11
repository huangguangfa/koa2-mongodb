const Koa = require('koa')
const bodyParser = require('koa-bodyparser'); //post请求的中间件

const app = new Koa()

app.use(async (ctx, next)=> {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
      ctx.body = 200; 
    } else {
      await next();
    }
  });

app.use(bodyParser())

let router = require('./router/allRoute') //引入路由

app.use(router.routes()) //使用路由和启用
app.use(router.allowedMethods())



app.listen(3000,()=>{
    console.log('服务已经启动 通过http://192.168.0.11:3000/')
})

