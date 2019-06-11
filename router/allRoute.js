//总路由配置
const router = require('koa-router')();
var DB = require('../mongodb/module/db');
router.get('/listData', async (ctx, next) =>{  //ctx 包含了request 和response
    //ctx.query
    ctx.body = await DB.find('users',{});
    // let id = ctx.query.id
    // let data =  await DB.find('users',{'_id':DB.getObjectId(id)}); //单个查询
})

router.post('/add', async (ctx, next) =>{
    let data = await DB.insert('users',ctx.request.body);
    if(data.result.ok === 1){
        ctx.body = '新增成功!!'
    }else{
        ctx.body = '新增失败!!'
    }
    //ctx.request.body 获取post请求的参数
    
})

router.post('/update', async (ctx, next) =>{   //修改
    let id = ctx.request.body.id;
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    let email = ctx.request.body.email;
    let data = await DB.update('users',{'_id':DB.getObjectId(id)},{
        username,password,email
    })
    if(data.result.ok === 1){
        ctx.body = '修改成功!!'
    }else{
        ctx.body = '修改失败!!'
    }
})

router.get('/delete', async (ctx, next) =>{ 
    //ctx.query
    let data = await DB.remove('users',{"username":ctx.query.username});
    if(data.result.ok === 1){
        ctx.body = '删除成功!!'
    }else{
        ctx.body = '删除失败!!'
    }
})


module.exports = router