const router = require('koa-router')();

router.post('/login', async (ctx, next) =>{
    //ctx.request.body 获取post请求的参数
    console.log(ctx.cookies.get('username'))
    ctx.body = ctx.request.body
})

module.exports = router; //导出路