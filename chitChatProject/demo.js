const express = require('express');
const app = express()
const server = require('http').createServer(app);
const WebSocket=require('ws');


const wss=new WebSocket.Server({server:server});

wss.on("connection",function connection (ws){

// console.log("a new client connected");
//     ws.send("welcome to new client");
    ws.on('message',function incoming(event){


        //  ws.send(event)
        console.log(wss.clients,"connection all")
        wss.clients.forEach(function oneByOne(client){
            // console.log(ws,client,"connection all")
            if(client !==ws && client.readyState === WebSocket.OPEN){
                client.send(event);
            }
        })
    })
})

app.get('/', (req, res) => res.send('Hello World!'))

server.listen(3000, () => console.log(`Lisening on port :3000`))