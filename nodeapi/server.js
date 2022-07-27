var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser")
var cors = require("cors");//for req from all domain
const { reset } = require("nodemon");

app.use(cors());

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended:false})

var con = mysql.createConnection({
    host: "192.168.56.56",
    user: "homestead",
    password: "secret",
    database: "homestead"
})

con.connect((err)=>{
    if(err) {throw err ;}
    console.log("connected to database")
})


app.get("/",function(req,res){
    res.send("<h1>Welcome page</h>")
})

app.get("/customers",function(req,res){
     con.query("select * from customers",(err,result,fields)=>{
        if(err) throw err;
        res.send(result)
     })
    
})

app.post('/addbookings',urlencodedParser,function(req,res){
    
    let mobile = req.body.patient_mobile;
    let patient_name = req.body.patient_name;
    let age = req.body.age
    let gender = req.body.gender
    let patient_address = req.body.patient_address
    let patient_pincode = req.body.patient_pincode
    let patient_latitude = req.body.patient_latitude
    let patient_longitude = req.body.patient_longitude
    let district_id = req.body.patient_district
    let lab_id = req.body.lab_id
    let paper_bill = req.body.paper_bill_needed
    let booked_by_id = 8;
    let booking_device = 2; //mobile app
    let booking_status = 1;
    let service_charge = 100;
    let booking_total = 300;
    let qry =  `INSERT INTO bookings (
    mobile,
    patient_name,
    gender,
    age,
    patient_address,
    patient_pincode,
    district_id,
    patient_latitude,
    patient_longitude,
   
    lab_id,
    paper_bill,
    
    
    booked_by_id,
    booking_device,
    booking_status,
    service_charge,
    booking_total ) VALUES (
    '${mobile}',
    '${patient_name}',
    '${gender}',
    '${age}',
    '${patient_address}',
    '${patient_pincode}',
    '${district_id}',
    '${patient_latitude}',
    '${patient_longitude}',
    
    '${lab_id}',
    '${paper_bill}',
   
    '${booked_by_id}',
    '${booking_device}',
    '${booking_status}',
    '${service_charge}',
    '${booking_total}' 

   )`;

   con.query(qry,(err,result,fields)=>{
        if(err){
            res.send({error:"Operation failed"})
        }else{
            res.send({success:"Inserted success"})
        }
   })

})

app.get('/bookings',function(req,res){
    con.query("select * from bookings",(err,result,fields)=>{
        if(err) throw err;
        res.send(result)
    })
})

app.get('/bookings/:id',function(req,res){
    let id = req.params.id
    con.query("select *from bookings where id="+id,(err,result,fields)=>{
        if(err) throw err;
        res.send(result)
    })
})

app.listen(9000,function(){
    console.log("server started")
})