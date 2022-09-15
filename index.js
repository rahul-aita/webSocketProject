const http=require('http');
const WebSocketServer=require("websocket").server
let connection=null;
const httpServer=http.createServer((req,res)=>{
    console.log("we have received your request")
})
const websocket=new WebSocketServer({
    "httpServer":httpServer
})
websocket.on("request",request=>{
    connection=request.accept(null,request.origin)
    connection.on("open",()=>console.log("opened"))
    connection.on("close",()=>console.log("opened"))
    connection.on("message",message=>{
        console.log(`received message",${message}`)
    })
    everyFiveSeconds()
})

function everyFiveSeconds(){
    connection.send(`message,${Math.random}`);
    // setTimeout(everyFiveSeconds,5000)
}
httpServer.listen(3000,()=>{
    console.log("server start at port 3000")
})