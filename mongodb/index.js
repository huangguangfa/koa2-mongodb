const MongoClient = require('mongodb').MongoClient;

const dburl = 'mongodb://localhost:27017';

const dbName = 'itcast';  


MongoClient.connect(dburl,(err,client) =>{
    if(err){
        console.log(err)
        return false
    }
    var db = client.db(dbName)

    //增加数据
    // db.collection('users').insertOne({username:'新增1',password:123456,email:'145@qq'},(err,result) =>{
    //     if(!err){
    //         console.log('增加数据成功')
    //     }
    // })
    //查询数据
    var result = db.collection('users').find({});
    result.toArray( (err,docs) =>{
        console.log(docs)
    })
})


