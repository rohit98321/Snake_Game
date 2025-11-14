const board = document.querySelector(".board");

const blockHeight = 30;
const blockWidth = 30;

let score=0;
let highScore=document.querySelector("#highscore").innerHTML=localStorage.getItem("highscore") || 0;


//clientWidth --> find any object width

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);
console.log(cols, rows);





// for (let i = 0; i < cols * rows; i++) {
//   blocks += `<div class="block"></div>`;
//   board.innerHTML = blocks;
// }

let level="hard";
let food={
  x:Math.floor(Math.random()*rows),
  y:Math.floor(Math.random()*cols)
}
const blocks = [];
let snake = [
  { x: 2, y: 2 },
  { x: 2, y: 3 },
  { x: 2, y:4 },
];







for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block =document.createElement('div');
    block.classList.add("block");
    block.innerHTML=`${row},${col}`
    board.appendChild(block)
    blocks[`${row}-${col}`] = block;
  }
}

const render = () => {
  snake.forEach(seg=>{
    blocks[`${seg.x}-${seg.y}`].classList.add("fill");
  })
}

render()

let direction="";
let intervalStop;



intervalStop=setInterval(() => {


  blocks[`${food.x}-${food.y}`].classList.add("food");
  let head=null;

  if(direction === "left"){
    head={x:snake[0].x,y:snake[0].y-1}
  }
  else if(direction === "right"){
    head={x:snake[0].x,y:snake[0].y+1}
  }
  else if(direction === "up"){
    head={x:snake[0].x-1,y:snake[0].y}
  }else{
    if({x:snake[0].x === rows-1}){
      head={x:0,y:snake[0].y}
    }
    head={x:snake[0].x+1,y:snake[0].y}
  }


  if(head.x === food.x && head.y === food.y){
    blocks[`${food.x}-${food.y}`].classList.remove("food");

    food={
      x:Math.floor(Math.random()*rows),
      y:Math.floor(Math.random()*cols)
    }
    blocks[`${food.x}-${food.y}`].classList.add("food");
    score++;
    snake.unshift(head);
    document.querySelector("#score").innerHTML=score;
    if(score>highScore){
      highScore=score;
      localStorage.setItem("highscore",highScore);
    }

  }

  if(level==="hard"){
    if( head.x<0 || head.x >=rows || head.y<0 || head.y>=cols){
      clearInterval(intervalStop);
      alert("Game Over");
      return;
    }
  }
  else if(level === "easy"){
    if(head.x==0){
      head.x=rows-1;
    }else if(head.x ===rows-1){
      head.x=0;
    }else if(head.y==0){
      head.y=cols-1;
    }
    else if(head.y==cols-1){
      head.y=0;
    }
    
  }




  snake.forEach(seg=>{
    blocks[`${seg.x}-${seg.y}`].classList.remove("fill");
  })

  snake.unshift(head);
  snake.pop();


render()

}, 400);


addEventListener("keydown",(event)=>{
  if(event.key === "ArrowUp") direction="up"
  else if(event.key === "ArrowDown") direction="down"
  else if(event.key === "ArrowLeft") direction="left"
  else if(event.key === "ArrowRight") direction="right"
})

document.querySelector(".up").addEventListener("click",()=>{
  direction="up"
})
document.querySelector(".down").addEventListener("click",()=>{
  direction="down"
})  
document.querySelector(".left").addEventListener("click",()=>{
  direction="left"
})  
document.querySelector(".right").addEventListener("click",()=>{
  direction="right"
})  

