// const interval = setInterval(() => {
//   console.log("running");
// }, 1000);

// setTimeout(()=>{
//     console.log("rUNNING @")
//     clearInterval(interval)
// },5000)

//console.log(global)

// console.log(__filename)
// console.log(__dirname)

// const path = require("path")
// console.log(path.join(__dirname,"api/v1","script.js"))

const EventEmitter = require("events")
const emitter = new EventEmitter();

emitter.on("mesage",(data)=>{
    console.log(data.text)
})

emitter.on("logot",(data)=>{
    console.log(data.text)
})

emitter.emit("mesage",{text:"user logged in"})
emitter.emit("logot",{text:"user logged out"})



