const express = require('express');
const app = express()
const server = require('http').createServer(app);
const WebSocket=require('ws');

var ticTac=[
{x:'0',y:'0',value:''},
{x:'1',y:'0',value:''},
{x:'2',y:'0',value:''},
{x:'0',y:'1',value:''},
{x:'1',y:'1',value:''},
{x:'1',y:'2',value:''},
{x:'0',y:'2',value:''},
{x:'2',y:'1',value:''},
{x:'2',y:'2',value:''}]

function createTICtac(){
    var ticTac=[
        {x:'0',y:'0',value:''},
        {x:'1',y:'0',value:''},
        {x:'2',y:'0',value:''},
        {x:'0',y:'1',value:''},
        {x:'1',y:'1',value:''},
        {x:'1',y:'2',value:''},
        {x:'0',y:'2',value:''},
        {x:'2',y:'1',value:''},
        {x:'2',y:'2',value:''}]
        return ticTac;
}
var ticTAClist=[];
var userList=[];
console.log(userList,"userlist")
next_uid = 0;
process.on('uncaughtException', function (err) {

    console.error(err);
    
    });
const wss=new WebSocket.Server({server:server});
wss.on("connection",function connection (ws,req){
//   wss.on('open',function(){
// });

//  ticTAClist.push(createTICtac());
//  ticTAClist.push()
// ws.on('Message' ,function(msg) {
//     var userList=[];
//     ws.id = wss.getUniqueID(),
//     userList.push(ws.id),
//     ws.send("You've won wooohoo")
// });
     ws.id = wss.getUniqueID(),
    ws.on('message',function incoming(event){
        // ws.id = wss.getUniqueID(),
        // userList.push(ws.id),
        // ws.send("You've won wooohoo")
        console.log(event,"cheak event")
        wss.clients.forEach(function each(test) {
            console.log('Client.ID: ' + test.id);
        })
        const incomingData=JSON.parse(event)
        console.log(incomingData,"data cheak")
        // const filterXandY=ticTac.filter(X=> {return X.x==`${data.data.x}` && X.y==`${data.data.y}` &&  X.value==""})
         const searchIndex=ticTac.findIndex(X => X.x===incomingData.data.x && X.y===incomingData.data.y);
         console.log(searchIndex)
         ticTac[searchIndex].value = `${ws.id}`
          console.log( ticTac,"value")
        //   ws.send(ws.id);
         console.log( ticTac[searchIndex])
        wss.clients.forEach(function oneByOne(client){
            if(client !==ws && client.readyState === WebSocket.OPEN){
                client.send(event);
            }
        })
    })
  
    ws.id = ++userList; 
    userList[ws.id] = { }
    ws.on('message', function (message) {
             console.log('message form ' + ws.id);
    });
    ws.on('close', function (code, reason) {
        console.log(ws.id + ' disconnected');
        delete userList[ws.id];
    });
})


wss.getUniqueID = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};



app.get('/', (req, res) => res.send('Hello World!'))

server.listen(3000, () => console.log(`Lisening on port :3000`))



