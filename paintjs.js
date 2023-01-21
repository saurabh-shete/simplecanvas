var arr_touches =[];
var canvas;
var ctx;
var down=false;//mouse is present
var color='black';//default drawing color
var width=5;//drawing width
var undoStack = [];
var redoStack = [];

//calling window.onload to make sure HTML is loaded
window.onload = () =>{
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.lineWidth = width;

  //handling mouse click and move event
  canvas.addEventListener('mousemove', handleMove);
  canvas.addEventListener('mousedown', handleDown);
  canvas.addEventListener('mouseup', handleUp);

}



var handleMove = (e)=> {
  xPos = e.clientX-canvas.offsetLeft;
  yPos = e.clientY-canvas.offsetTop;
  if(down==true)
  {
    ctx.lineTo(xPos, yPos); //create a line from old point to new one
    ctx.strokeStyle = color;
    ctx.stroke();
  }
}

var handleDown = ()=>{
  down =true;
  undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  redoStack = [];
  ctx.beginPath();
  ctx.moveTo(xPos,yPos);
}

var handleUp = () => {
  down = false;
}

var changeColor = (new_color)=> {
  color = new_color;
}

function undo() {
  var last = undoStack.pop();
  if (last) {
    redoStack.push(last);
    //clearCanvas();
    ctx.putImageData(last, 0, 0);
  }
}

function redo() {
  var next = redoStack.pop();
  if (next) {
    undoStack.push(next);
    //clearCanvas();
    ctx.putImageData(next, 0, 0);
  }
}
var clearCanvas = ()=>{
  ctx.clearRect(0,0,canvas.width,canvas.height);
}

