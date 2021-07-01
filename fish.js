const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;

let score = 0;
let gameFrame = 0;
ctx.font = "50px Arial";
let gs = 1;
let cP = canvas.getBoundingClientRect();

const mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  click: false
};

canvas.addEventListener("mousedown", function (event) {
  mouse.click = true;
  mouse.x = event.x - cP.left;
  mouse.y = event.y - cP.top;
});
canvas.addEventListener("mouseup", function (event) {
  mouse.click = false;
});
const pLeft = new Image();
pLeft.src = 'https://lh3.googleusercontent.com/proxy/Arz-PFZQacFwEkkPJOaVnIRaFYAXkka80hl-NxzFKzY-D0wn3aoDUlq3s9pPX0GGCTDaRgy2f4mN4Is90pS5tscO_O7IQHvr';
const pR = new Image();
pR.src = 'https://lh3.googleusercontent.com/proxy/Arz-PFZQacFwEkkPJOaVnIRaFYAXkka80hl-NxzFKzY-D0wn3aoDUlq3s9pPX0GGCTDaRgy2f4mN4Is90pS5tscO_O7IQHvr';

class Playa {
 
  constructor() {
    this.x = canvas.width;
    this.y = canvas.height / 2;
    this.radius = 50;
    this.angle = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.frame = 0;
    this.spriteWidth = 692;
    this.spriteHeight = 599;
  }
  update() {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    let theta = Math.atan2(dy, dx);
    this.angle = theta;
    if (mouse.x != this.x) {
      this.x -= dx / 30;
    }
    if (mouse.y != this.y) {
      this.y -= dy / 30;
    }
  }
  draw() {
    if (mouse.click) {
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(mouse.x, mouse.y);
    //  ctx.stroke();
    }
   /* ctx.fillStyle = "teal";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.fillRect(this.x, this.y, this.radius, 10);
*/
ctx.save();
ctx.translate(this.x, this.y);
ctx.rotate(this.angle);

    if(this.x >= mouse.x){
      ctx.drawImage(pLeft, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, 0 - 95, 0 - 72, this.spriteWidth * 0.55, this.spriteHeight * 0.55);

    }  
    else{
      ctx.drawImage(pR, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, 0 - 95, 0 - 72, this.spriteWidth * 0.55, this.spriteHeight * 0.55);

    }
   ctx.restore();
  }
}
const playa = new Playa();
//////////////////////bbbbbb

const bA = [];
const bi = new Image();
bi.src = 'https://answers.unity.com/storage/temp/30078-balloon_green_512.png';
class Balloo {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 100 + Math.random() * canvas.height;
    this.radius = 50;
    this.speed = Math.random() * 5 + 1;
    this.distance;
    this.counted = false;
    this.sound = Math.random() <= 0.5 ? "sound1" : "sound2";
  }
  update() {
    this.y -= this.speed;
    const dx = this.x - playa.x;
    const dy = this.y - playa.y;
    this.distance = Math.sqrt(dx * dx + dy * dy);
  }
  draw() {
    /*ctx.fillStyle = "brown";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();*/
    ctx.drawImage(bi, this.x-60, this.y-55, this.radius*2.5, this.radius*2.5);
  }
}

const bP1 = document.createElement("audio");
bP1.src = "pop1.ogg";
const bP2 = document.createElement("audio");
bP2.src = "pop2.ogg";

function bal() {
  if (gameFrame % 50 == 0) {
    bA.push(new Balloo());
  }
  for (let i = 0; i < bA.length; i++) {
    bA[i].update();
    bA[i].draw();
    if (bA[i].y < 0 - bA[i].radius * 2) {
      bA.splice(i, 1);
      i--;
    }
 
    else if (bA[i].distance < bA[i].radius + playa.radius) {
      if (!bA[i].counted) {
        if (bA[i].sound == "sound1") {
          bP1.play();
        
        } else {
          bP2.play();
        
        }

        score++;
        bA[i].counted = true;
        bA.splice(i, 1);
        i--;
      }
    }
  
  
  }
  for (let i = 0; i < bA.length; i++) {
 
  }
}

/////b
const bg = new Image();
bg.src = 'https://thumbs.dreamstime.com/b/forest-game-background-d-application-vector-design-tileable-horizontally-size-ready-parallax-effect-73706218.jpg';

const bbb = {
  x:0,
  xx: canvas.width,
  y:0,
  width: canvas.width,
  height: canvas.height
}


function hbg(){
  bbb.x-=gs;
  if(bbb.x < -bbb.width) bbb.x = bbb.width;
  bbb.xx-=gs;
  if(bbb.xx < -bbb.width) bbb.xx = bbb.width;
  ctx.drawImage(bg, bbb.x, bbb.y, bbb.width, bbb.height);
  ctx.drawImage(bg, bbb.xx, bbb.y, bbb.width, bbb.height);
}


function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hbg();
  bal();
  playa.update();
  playa.draw();
  ctx.fillStyle = "black";
  ctx.fillText("SCORE: " + score, 10, 50);
  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
window.addEventListener('resize', function(){
  cP = canvas.getBoundingClientRect();
});