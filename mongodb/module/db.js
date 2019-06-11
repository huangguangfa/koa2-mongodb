const MongoClient = require('mongodb').MongoClient;

const ObjectID = require('mongodb').ObjectID;

const config = require('./confing.js')

class Db {
    static getInstance(){  //单列  多次实例不共享问题
        if(!Db.instance){
            Db.instance = new Db();
        }
        return Db.instance;
    }

    constructor(){
        this.dbClient = null;//保持 db对象
        this.connect();
    }

    connect(){  //连接数据库
        return new Promise( (resolve,reject) =>{
            if(!this.dbClient){  //不存在 去连接数据库
                MongoClient.connect(config.dbUrl,{ useNewUrlParser: true },(err,client) =>{
                    if(err){
                        reject(err)
                    }else{
                        let db = client.db(config.dbName)
                        this.dbClient = db
                        resolve(this.dbClient)
                    }
                })
            }else{
                resolve(this.dbClient)  //存在直接返回对象
            }
        })
    }
    
    find(collectionName,json){                                          //查询
        return new Promise( (resolve,reject) =>{
            this.connect().then( (db) =>{
                var result = db.collection(collectionName).find(json)
                result.toArray((err,docs) =>{
                   if(err){
                       return reject(err)
                   }
                   resolve(docs)
                })
            })
        })
    }

    insert(collectionName,json){                                        //插入数据
        return new Promise((resolve,reject) =>{
            this.connect().then((db) =>{
                db.collection(collectionName).insertOne(json,(err,result) =>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(result)
                    }
                })
            })
        })
    }

    update(collectionName,json1,json2){                                 //更新
        return new Promise((resolve,reject) =>{
            this.connect().then((db) =>{
                db.collection(collectionName).updateOne(json1,{
                    $set:json2
                },(err,result) =>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(result)
                    }
                })
            })
        })
    }

    remove(collectionName,json){                          //删除
        return new Promise((resolve,reject) =>{
            this.connect().then((db) =>{
                db.collection(collectionName).removeOne(json,(err,result) =>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(result)
                    }
                })
            })
        })
    }

    getObjectId(id){
        return new ObjectID(id)
    }

}

module.exports = Db.getInstance()