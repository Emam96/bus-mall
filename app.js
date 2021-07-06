"use strict";

let productSrs = [
  "bag.jpg",
  "banana.jpg",
  "bathroom.jpg",
  "boots.jpg",
  "breakfast.jpg",
  "bubblegum.jpg",
  "chair.jpg",
  "cthulhu.jpg",
  "dog-duck.jpg",
  "dragon.jpg",
  "pen.jpg",
  "pet-sweep.jpg",
  "scissors.jpg",
  "shark.jpg",
  "sweep.png",
  "tauntaun.jpg",
  "unicorn.jpg",
  "water-can.jpg",
  "wine-glass.jpg",
];

let productNames = [
  "bag",
  "banana",
  "bathroom",
  "boots",
  "breakfast",
  "bubblegum",
  "chair",
  "cthulhu",
  "dog-duck",
  "dragon",
  "pen",
  "pet-sweep",
  "scissors",
  "shark",
  "sweep",
  "tauntaun",
  "unicorn",
  "water-can",
  "wine-glass",
];

let sheet = document.getElementById("sheet");
let data = document.getElementById("Data");
let subtitle = document.getElementById("subtitle");
let subt = document.getElementById("subtitle");

let leftImg = document.getElementById("Left");
let centerImg = document.getElementById("Center");
let rightImg = document.getElementById("Right");

const btn2 = document.querySelector("button");
let viewsAr = [];
let votesAr = [];
let products = [];
let    nxtImg = [];
let round = 1;
let maxRounds = 25;

let Left;
let Center;
let Right;

let nxtleft;
let nxtCenter;
let nxtRight;



function pushToStorge() {

 let codedData = JSON.stringify(products); 
 let codedVoteData = JSON.stringify(votesAr);
 let codedViewData = JSON.stringify(viewsAr);
 let codednxtData = JSON.stringify(nxtImg);

//  console.log(codedData);
  
  localStorage.setItem('data', codedData);
  localStorage.setItem('votedata', codedVoteData);
  localStorage.setItem('viewdata', codedViewData);
  localStorage.setItem('nxtdata', codednxtData);
  
}



function retrieveFromStorge() {

  let retrieveData = localStorage.getItem('data');
  let retrieveVoteData = localStorage.getItem('votedata');
  let retrieveViewData = localStorage.getItem('viewdata');
  let retrieveNxtData = localStorage.getItem('nxtdata');

  let decodedData = JSON.parse(retrieveData);
  let decodedVoteData = JSON.parse(retrieveVoteData);
  let decodedViewData = JSON.parse(retrieveViewData);
  let decodedNxtData = JSON.parse(retrieveNxtData);
  
  // console.log(decodedData);
  
  if (decodedData !== null) {
    products = decodedData;
    renderAlbum();
}
if (decodedVoteData !== null) {
  votesAr = decodedVoteData;
  renderAlbum();
}
if (decodedViewData !== null) {
  viewsAr = decodedViewData;
  renderAlbum();
}

if (decodedNxtData !== null) {
  nxtImg = decodedNxtData;
  renderAlbum();
}



}
retrieveFromStorge();





function Product(name) {
  // constructor

  this.Name = name.split(".")[0];
  this.img = "images/" + name;
  this.votes = 0;
  this.views = 0;
  products.push(this);
  pushToStorge();
}

for (let i = 0; i < productSrs.length; i++) {
  // object maker
  new Product(productSrs[i]);
}

function randomize() {
  // random number maker

  return Math.floor(Math.random() * products.length);
}




function renderAlbum() {
  // photo screen
  
  Left = randomize();
  Center = randomize();
  Right = randomize();
  
  while (Center === Right || Left === Center || Left === Right || nxtImg.includes(Left) || nxtImg.includes(Center) || nxtImg.includes(Right) ) {
    Left = randomize();
    Center = randomize();
    Right = randomize();
  }
   nxtImg = [];

  nxtImg.push(Left);
  nxtImg.push(Center);
  nxtImg.push(Right);
  
  leftImg.setAttribute("src", products[Left].img);
  centerImg.setAttribute("src", products[Center].img);
  rightImg.setAttribute("src", products[Right].img);

  leftImg.setAttribute("title", products[Left].Name);
  centerImg.setAttribute("title", products[Center].Name);
  rightImg.setAttribute("title", products[Right].Name);
  products[Left].views++;
  products[Center].views++;
  products[Right].views++;
  
}

renderAlbum();




leftImg.addEventListener("click", clicks);
centerImg.addEventListener("click", clicks);
rightImg.addEventListener("click", clicks);








function clicks(event) {
  // data screen
  
  event.preventDefault();
  if (round <= maxRounds) {
    let clicked = event.target.id;
    if (clicked === "Left") {
      products[Left].votes++;
    } else if (clicked === "Center") {
      products[Center].votes++;
    } else if (clicked === "Right") {
      products[Right].votes++;
    }
   
    renderAlbum();
    
  } else {
    function show() {
      data.li = '';
      let h3 = document.createElement("h3");
      h3.textContent = "RESULTS";
      subt.appendChild(h3);
      
      for (let i = 0; i < products.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${products[i].Name} has ${products[i].votes} votes and was seen ${products[i].views} times.`;
        data.appendChild(li);
        viewsAr.push(products[i].views);
        votesAr.push(products[i].votes);
      }
      
      
      
      leftImg.removeEventListener("click", clicks);
      centerImg.removeEventListener("click", clicks);
      rightImg.removeEventListener("click", clicks);
     
      chartShow();
      
    }
    
    btn2.onclick = show; //  toggle
   
  }
  round++;
 
}

















function chartShow() {
  let ctx = document.getElementById("myChart");
  let myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: productNames,
      datasets: [
        {
          label: "Votes",
          data: votesAr,
          backgroundColor: ["rgb(211, 32, 32)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 0,
        },
        {
          label: "views",
          data: viewsAr,
          backgroundColor: ["rgb(71, 99, 255)"],
          borderColor: ["rgba(155, 199, 120, 0.2)"],
          borderWidth: 0,
        },
      ],
    },

    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

