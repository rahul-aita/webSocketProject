
const websocket=require('ws');
const wss=new websocket.Server({
    port:4848
})
console.log(`server started `)
wss.on('connection',function(ws){
    ws.send("hello I from the server")
    // ws.on('message',function(data){
    //     console.log(data)
    // })
})