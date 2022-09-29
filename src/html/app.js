var arr,
  arr_events = [],
  win_block,
  winner,
  again,
  winning,
  game,
  stat;

var comp_sym = "o";
let user_sym = "";

const ws = new WebSocket("ws://localhost:3000");

main = () => {
  game = document.getElementById("game");
  arr = game.getElementsByClassName("inner");
  win_block = document.getElementById("win_block");
  win_text = win_block.getElementsByClassName("winner")[0];
  again = win_block.getElementsByClassName("again")[0];
  winning = game.getElementsByClassName("winning")[0];

  for (var i = 0; i < arr.length; i++) {
    arr[i].onclick = function () {
      sendDrawSym(this);
    };
  }
};

onload = function () {
  stat = document.getElementById("status");
  const ready = document.getElementById("ready");
  ready.onclick = () => {
    ready.disabled = true;
    stat.innerHTML = "Now wait enemy";
    ws.send("true");
    main();
  };
};

function sendDrawSym(item) {
  if (item.hasChildNodes()) return false;

  ws.send(`ID_${item.id}`);

  return true;
}

function clearTable() {
  for (var i = 0; i < arr.length; i++) {
    arr[i].innerHTML = "";
  }
}

const isWinner = (symbol) => {
  if (symbol === user_sym) {
    stat.innerHTML = "You are win!!!";
    winning.style.background = "green";
    winning.style.opacity = 0.7;
    winning.style.display = "block";
  } else {
    stat.innerHTML = "You are lose...";
    winning.style.background = "red";
    winning.style.opacity = 0.7;
    winning.style.display = "block";
  }
};

ws.onmessage = (res) => {
  const response = JSON.parse(res.data);
  const message = response.message;

  switch (response.type) {
    case "set_symbol":
      user_sym = message;
      stat.innerHTML = `You are \"${user_sym}\"`;
      break;
    case "status":
      stat.innerHTML = message;
      break;
    case "enemy_disconnect":
      stat.innerHTML = message;
      winning.style.color = "yellow";
      winning.style.display = "block";
      break;
    case "command":
      document.getElementById(message.split("_")[0]).innerHTML = message.split("_")[1];
      break;
    case "winner":
      isWinner(message);
      break;
    default:
      stat.innerHTML = res.data;
      break;
  }
};
