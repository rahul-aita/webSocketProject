var array = [
  {x:'0',y:'0' },
  {x:'1',y:'0'},
  { x:'2',y:'0'},
  { x:'0',y:'1'},
  {x:'1',y:'1'},
  {x:'1',y:'2'},
  {x:'0',y:'2'},
  {x:'2',y:'1'},
  {x:'2',y:'2'}
]

var blankArray = []


var container = document.getElementById("box");
for (var i = 0; i < array.length; i++) {
  container.innerHTML += `

   <div class=" col-4 box-col  bt-0 bl-0 tic_${i} span-box"   onclick="getAllDataFromArray(${i})">
   <div class="hide"><span class="boxText " ></span></div></div>`;
}

function getAllDataFromArray(index) {
  let data = array[index]
  console.log(data.x, "data show")
  websocket.send(JSON.stringify({
    data
  }))

  // var elems = document.getElementsByClassName(`hide`)
  // elems[index].style.display="none"
  var elems = document.getElementsByClassName(`boxText`)
  elems[index].innerText = `${turn}`;
  showCrossAndCircle(index)
  turn = ChangeTurn()
  document.getElementsByClassName('name')[0].innerText = "turn for:-" + turn;
  blankArray.push(index)
  if (index !== -1) {
    showAndHidespan(index)
  } else {
    var len = document.getElementsByClassName('span-box').length;
    for (var i = 0; i < len; i++) {
      if (blankArray.includes(i)) {
        document.getElementsByClassName('span-box')[i].style.pointerEvents = "none";
      } else {
        document.getElementsByClassName('span-box')[i].style.pointerEvents = "auto";
      }
    }
  }
}

function showDataOnOtherTab(selectedData) {
  console.log(selectedData,"hjh")
  const indexOfSelectedData = array.findIndex(X => X.x === selectedData.data.x && X.y === selectedData.data.y)
  var elems = document.getElementsByClassName(`boxText`)
  elems[indexOfSelectedData].innerText = `${turn}`;
  showCrossAndCircle(selectedData)
  turn = ChangeTurn()
  document.getElementsByClassName('name')[0].innerText = "turn for:-" + turn;

  // var elems = document.getElementsByClassName(`hide`)
  // elems[indexOfSelectedData].style.display="none"
  blankArray.push(indexOfSelectedData)
  if (selectedData === indexOfSelectedData) {
    showAndHidespan(indexOfSelectedData)
  } else {
    var len = document.getElementsByClassName('span-box').length;
    for (var i = 0; i < len; i++) {
      if (blankArray.includes(i)) {
        document.getElementsByClassName('span-box')[i].style.pointerEvents = "none";
      } else {
        document.getElementsByClassName('span-box')[i].style.pointerEvents = "auto";
      }
    }
  }
}
//client side code;
const messageArea = document.querySelector('#messageArea');
const websocket = new WebSocket('ws://localhost:3000');
websocket.addEventListener('connect', () => {
  console.log(this.websocket.id);
});
//https://myhost:8080?myCustomParam=1111&myCustomID=2222
function receivedMessageOnEvent(event) {
  event;
}

function receivedMessageFromServer() {
  if (!websocket) {
    websocket.addEventListener('open', (event) => {
      websocket.send('connection  opend!');
    });
  }

  websocket.addEventListener('message', function (event) {
    if (event.data instanceof Blob) {
      reader = new FileReader();
      reader.onload = () => {
        receivedMessageOnEvent(reader.result)
        showCrossAndCircle(JSON.parse(reader.result))
        showDataOnOtherTab(JSON.parse(reader.result))
        console.log("Result: " + reader.result);
      };
      reader.readAsText(event.data);
    } else {
      receivedMessageOnEvent(event.data)
      showCrossAndCircle(JSON.parse(event.data))
      showDataOnOtherTab(JSON.parse(event.data))
      console.log("Result: " + event.data);
    }
  });
}

receivedMessageFromServer();

let turn = "X";
const ChangeTurn = () => {
  return turn === "X" ? "0" : "X"
}

function showCrossAndCircle() {
  let boxes = document.getElementsByClassName('hide')
  Array.from(boxes).forEach(element => {
    let boxText = element.querySelector('.boxText')
    element.addEventListener('click', (e) => {
      if (boxText.innerText === '') {
        boxText.innerText = turn;
        turn = ChangeTurn()
        document.getElementsByClassName('name')[0].innerText = "turn for:-" + turn;
      }
    })
  });
}

function showAndHidespan(that) {
  var len = document.getElementsByClassName('span-box').length;
  for (var i = 0; i < len; i++) {
    document.getElementsByClassName('span-box')[i].style.pointerEvents = "none";
  }
  var val = that.value;
  document.getElementById(val).style.pointerEvents="auto";

}