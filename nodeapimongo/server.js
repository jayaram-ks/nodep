const MongoClient = require("mongodb").MongoClient;
const conn_string = "mongodb://localhost:27017"
const express = require('express')
const app = express()

MongoClient.connect(conn_string,{useUnifiedtopology:true},function(error,client){
   
    var db = client.db("labzapp_db")

    app.get('/customers',function(req,res){

        db.collection('customers').find({}).toArray(function(err,data){
            if(err){
                res.send(err)
            }else{
                res.send(data)
            }
            client.close()
        })

    });

    app.listen(8100)

})
