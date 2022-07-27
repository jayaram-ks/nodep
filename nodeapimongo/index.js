const MongoClient = require("mongodb").MongoClient;
const conn_string = "mongodb://localhost:27017"
const express = require('express')
const app = express()

MongoClient.connect(conn_string,{useUnifiedtopology:true},function(err,client){
    console.log("----------------------")
    var db = client.db("labzapp_db")
    db.collection("customers").findOne({customer_name:"Rakesh"},function(err,result){
        if(err){
            console.log(err)
        }else
        {
           // console.log(result)
        }
        client.close();
    })
})

MongoClient.connect(conn_string,function(err,client){
    var db = client.db("labzapp_db") //SELECT only customer name where customer name = rakesh
    db.collection("customers").find({customer_name:"Rakesh"},{projection:{customer_name:1,_id:0}}).toArray(function(err,result){
        if(err){
            console.log(err)
        }else{
            //console.log(result)
        }
        client.close()
    })
})

MongoClient.connect(conn_string,function(err,client){
    var db = client.db("labzapp_db") //SELECT only customer name where customer name = rakesh 'project' function 
    db.collection("customers").find({customer_name:"Rakesh"}).project({customer_name:1,_id:0}).toArray(function(err,result){
        if(err){
            console.log(err)
        }else{
            //console.log(result)
        }
        client.close()
    })
})

MongoClient.connect(conn_string,function(err,client){
    var db = client.db("labzapp_db") //SELECT !=  not eqal to                     req fields to be fetched
    db.collection("customers").find({technician_id:{$ne:4}}).project({customer_name:1,_id:0}).toArray(function(err,result){
        if(err){
            console.log(err)
        }else{
            //console.log(result)
        }
        client.close()
    })
})

MongoClient.connect(conn_string,function(err,client){
    var db = client.db("labzapp_db") //SELECT !=  AND / OR                                            req fields to be fetched
    db.collection("customers").find({$and:[{customer_phone:'8547736586'},{customer_name:'Ancydaniel'}] }).project({customer_name:1,_id:0}).toArray(function(err,result){
        if(err){
            console.log(err)
        }else{
           // console.log(result)
        }
        client.close()
    })
})

MongoClient.connect(conn_string,function(err,client){
    var db = client.db("labzapp_db") //SELECT !=  AND  //starts with                                          req fields to be fetched
    db.collection("customers").find({$and:[{customer_phone:/^9/},{customer_name:/^j/}] }).project({customer_name:1,customer_phone:1,_id:0}).toArray(function(err,result){
        if(err){
            console.log(err)
        }else{
            //console.log(result)
        }
        client.close()
    })
})

MongoClient.connect(conn_string,function(err,client){
    var db = client.db("labzapp_db") //SELECT !=  or  //ends with 19 or 16                                         req fields to be fetched
    db.collection("customers").find({$or:[{customer_phone:/19$/},{customer_phone:/16$/}] }).project({customer_name:1,customer_phone:1,_id:0}).toArray(function(err,result){
        if(err){
            console.log(err)
        }else{
            //console.log(result)
        }
        client.close()
    })
})

MongoClient.connect(conn_string,function(err,client){
    var db = client.db("labzapp_db") //SELECT !=  or      < >                                 req fields to be fetched
    db.collection("customers").find({$and:[{customer_phone:{$lt:'7777777777'}},{customer_phone:{$gt:'6666666666'}}] }).project({customer_name:1,customer_phone:1,_id:0}).toArray(function(err,result){
        if(err){
            console.log(err)
        }else{
            //console.log(result)
        }
        client.close()
    })
})


MongoClient.connect(conn_string,function(err,client){
    var db = client.db("labzapp_db") // SELECT sort asc cdesc                          req fields to be fetched
    db.collection("customers").find({}).sort({customer_name:1}).project({customer_name:1,customer_phone:1,_id:0}).limit(120).toArray(function(err,result){
        if(err){
            console.log(err)
        }else{
           // console.log(result)
        }
        client.close()
    })
})


MongoClient.connect(conn_string,function(err,client){
    var db = client.db("labzapp_db") // IINSERT     
    
    var newcustomer = {
        
        "id" : "34123444",
        "customer_name" : "CHAKKA_KURU",
        "customer_address" : "Chakka developer address",
        "customer_phone" : "91919191919",
        "customer_pincode" : "897988",
        "customer_latitude" : "8.922363866807798",
        "customer_longitude" : "76.7120860889554",
        "district_id" : "2",
        "customer_status" : "1",
        "customer_created_by" : "1",
        "created_at" : "2021-08-26 14:00:47",
        "updated_at" : "2022-07-04 19:07:22",
        "customer_api_token" : "dgwlIibDoyJE2IMHPJXK0YkBqfRNCfKUxdSWPhq2ttlQRbmYk22dCuwAOODj",
        "customer_mobile_otp" : "",
        "otp_verified" : "1",
        "otp_timestamp" : "2022-07-04 19:06:30",
        "otp_temp_data" : "",
        "otp_attempts" : "{\"2022-07-04\":1}",
        "age" : "31",
        "gender" : "1",
        "fb_device_id" : "exVaRIaRRjqq3jBHT_LQot:APA91bGKiHzMGI8T78kzQDhJFqQ9VNqLVvvhvsl46nZH0--ZNfZh5pzYBeR5a8toiKCxiwVtrSP05AmDHUkQB_-o7GKWVXXtOxTB-fRflfpOW0PZnRtljwk6lLZAwCUw08L5szuQwji_"
    }

    // db.collection('customers').insertOne(newcustomer,function(err,res){

    //     if(err){
    //         console.log(err)
    //     }else{
    //         console.log("INSERTED")
    //     }
    //     client.close()

    // })
    client.close()
   
})

MongoClient.connect(conn_string,function(err,client){
    var db = client.db("labzapp_db") //DELETE ONE                         req fields to be fetched
    db.collection('customers').deleteOne({customer_phone:"9656912880"},function(err,res){
        if(err){
            console.log(err)
        }
        else{
            console.log(res)
        }
        client.close()
    })
})

// MongoClient.connect(conn_string,function(err,client){
//     var db = client.db("labzapp_db") // updateOne 
//     db.collection('customers').updateOne({customer_name:'Rakesh'},{$set:{customer_address:"Mattel",customer_api_token:'apiddddtoken'}},function(err,res){
//         if(err){
//             console.log(err)
//         }else{
//             console.log(res)
//         }
//     client.close()
//     })
// })

MongoClient.connect(conn_string,function(err,client){
    var db = client.db("labzapp_db") // updateMany 
    db.collection('customers').updateMany({ customer_pincode : "691532"},{$set:{customer_address:"changed pin address 691532",customer_api_token:'rewiuirouewiotueriotreitreoi'}},function(err,res){
        if(err){
            console.log(err)
        }else{
            //console.log(res)
        }
        client.close()
    })
})


