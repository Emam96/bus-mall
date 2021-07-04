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

let sheet = document.getElementById("sheet");
let data = document.getElementById("Data");
let subtitle = document.getElementById("subtitle");
let subt = document.getElementById("subtitle");

let leftImg = document.getElementById("Left");
let centerImg = document.getElementById("Center");
let rightImg = document.getElementById("Right");

const btn2 = document.querySelector("button");

let products = [];
let round = 1;
let maxRounds = 25;

let Left;
let Center;
let right;

function Product(name) {
  // constructor

  this.Name = name.split(".")[0];
  this.img = "images/" + name;
  this.votes = 0;
  this.views = 0;
  products.push(this);
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
  right = randomize();
  while (Left === Center || Center === right || Left === right) {
    Left = randomize();
    Center = randomize();
  }

  leftImg.setAttribute("src", products[Left].img);
  centerImg.setAttribute("src", products[Center].img);
  rightImg.setAttribute("src", products[right].img);

  leftImg.setAttribute("title", products[Left].Name);
  centerImg.setAttribute("title", products[Center].Name);
  rightImg.setAttribute("title", products[right].Name);
  products[Left].views++;
  products[Center].views++;
  products[right].views++;
}

renderAlbum();

leftImg.addEventListener("click", clicks);
centerImg.addEventListener("click", clicks);
rightImg.addEventListener("click", clicks);

function clicks(event) {
  // data screen
  if (round <= maxRounds) {
    let clicked = event.target.id;
    if (clicked === "Left") {
      products[Left].votes++;
    } else if (clicked === "Center") {
      products[Center].votes++;
    } else if (clicked === "Right") {
      products[right].votes++;
    }

    renderAlbum();
  } else {
    function show() {
      let h3 = document.createElement("h3");
      h3.textContent = "RESULTS";
      subt.appendChild(h3);

      for (let i = 0; i < products.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${products[i].Name} has ${products[i].votes} votes and was seen ${products[i].views} times.`;
        data.appendChild(li);
      }
      leftImg.removeEventListener("click", clicks);
      centerImg.removeEventListener("click", clicks);
      rightImg.removeEventListener("click", clicks);
    }

    btn2.onclick = show; //  toggle
  }
  round++;
}

// let emam; 
// let emamfun = function () {
//    let emam = 2;
//    console.log(emam);
// }

// console.log(emam);
// emamfun();
// console.log(emam);