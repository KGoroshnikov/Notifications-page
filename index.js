let unreadNotifications = document.getElementsByClassName("notification");
let itsMarks = document.getElementsByClassName("unread-mark");
let amountText = document.getElementById("amount-unread")
for(let i = 0; i < unreadNotifications.length; i++){
  unreadNotifications[i].style.opacity = "0";
}
updateStatus();

var ww = 0;
let inv = setInterval(animAppear, 60);

function animAppear(){
  if (ww >= unreadNotifications.length)
  {
    clearInterval(inv);
    return;
  }

  const anim = unreadNotifications[ww].animate(
    [{ opacity: "0" }, { opacity: "1" }],
    {
      fill: "forwards",
      easing: "ease",
      duration: 600,
    }
  );
  ww++;
  anim.play();
}

function updateStatus(){
  let cnt = 0;
  for(let i = 0; i < unreadNotifications.length; i++){
    if (unreadNotifications[i] != undefined){
      cnt += 1;
    }
  }
  amountText.textContent = cnt;
}

function readMessage(info){
  if (unreadNotifications[Number(info) - 1] == undefined) return;

  unreadNotifications[Number(info) - 1].style.backgroundColor = "hsl(0, 0%, 100%)";
  itsMarks[Number(info) - 1].style.display = "none";

  let newArr = [];
  for(let i = 0; i < unreadNotifications.length; i++){
    if (i == Number(info) - 1){
      newArr.push(null);
    }
    else{
      newArr.push(unreadNotifications[i]);
    }
  }
  unreadNotifications = newArr;

  updateStatus();
}

function readAll(){
  for(let i = 0; i < unreadNotifications.length; i++){
    readMessage(i + 1);
  }
  updateStatus();
}

[...document.getElementsByClassName("event-message")].forEach((e) => e.addEventListener('click', (e) => {
  readMessage(e.target.dataset.text)
}));

[...document.getElementsByClassName("sender-name")].forEach((e) => e.addEventListener('click', (e) => {
  readMessage(e.target.dataset.text)
}));

[...document.getElementsByClassName("private-message")].forEach((e) => e.addEventListener('click', (e) => {
  readMessage(e.target.dataset.text)
}));

[...document.getElementsByClassName("img-in-notification")].forEach((e) => e.addEventListener('click', (e) => {
  readMessage(e.target.dataset.text)
}));