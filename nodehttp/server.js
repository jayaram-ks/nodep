const http = require("http");
const path = require("path");
const fs = require("fs")
const server = http.createServer((req, res) => {
    if(req.url === '/'){
        fs.readFile(path.join(__dirname,'index.html'),(err,data)=>{
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(data);
            res.end()
        })  
    }
    if(req.url === '/user'){
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write("Hello JAYARAM K S");
        res.end();
    }
  
});
server.listen(3200, () => console.log("Server is up and running"));
