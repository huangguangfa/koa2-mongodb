
//个个路由配置
const router = require('koa-router')();


router.get('/listData', async (ctx, next) =>{  //ctx 包含了request 和response
    //ctx.query
    ctx.body = 'listdata' //ctx.body返回数据
})

module.exports = router; //导出路由